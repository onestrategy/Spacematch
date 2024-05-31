const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Follow_upsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const follow_ups = await db.follow_ups.create(
      {
        id: data.id || undefined,

        follow_up_date: data.follow_up_date || null,
        notes: data.notes || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await follow_ups.setLead(data.lead || null, {
      transaction,
    });

    await follow_ups.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    return follow_ups;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const follow_upsData = data.map((item, index) => ({
      id: item.id || undefined,

      follow_up_date: item.follow_up_date || null,
      notes: item.notes || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const follow_ups = await db.follow_ups.bulkCreate(follow_upsData, {
      transaction,
    });

    // For each item created, replace relation files

    return follow_ups;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const follow_ups = await db.follow_ups.findByPk(id, {}, { transaction });

    await follow_ups.update(
      {
        follow_up_date: data.follow_up_date || null,
        notes: data.notes || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await follow_ups.setLead(data.lead || null, {
      transaction,
    });

    await follow_ups.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    return follow_ups;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const follow_ups = await db.follow_ups.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of follow_ups) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of follow_ups) {
        await record.destroy({ transaction });
      }
    });

    return follow_ups;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const follow_ups = await db.follow_ups.findByPk(id, options);

    await follow_ups.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await follow_ups.destroy({
      transaction,
    });

    return follow_ups;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const follow_ups = await db.follow_ups.findOne({ where }, { transaction });

    if (!follow_ups) {
      return follow_ups;
    }

    const output = follow_ups.get({ plain: true });

    output.lead = await follow_ups.getLead({
      transaction,
    });

    output.organization = await follow_ups.getOrganization({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.leads,
        as: 'lead',
      },

      {
        model: db.organizations,
        as: 'organization',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.notes) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('follow_ups', 'notes', filter.notes),
        };
      }

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              follow_up_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              follow_up_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
        };
      }

      if (filter.follow_up_dateRange) {
        const [start, end] = filter.follow_up_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            follow_up_date: {
              ...where.follow_up_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            follow_up_date: {
              ...where.follow_up_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.lead) {
        var listItems = filter.lead.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          leadId: { [Op.or]: listItems },
        };
      }

      if (filter.organization) {
        var listItems = filter.organization.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.follow_ups.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.follow_ups.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('follow_ups', 'follow_up_date', query),
        ],
      };
    }

    const records = await db.follow_ups.findAll({
      attributes: ['id', 'follow_up_date'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['follow_up_date', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.follow_up_date,
    }));
  }
};
