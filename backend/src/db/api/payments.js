const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PaymentsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const payments = await db.payments.create(
      {
        id: data.id || undefined,

        amount: data.amount || null,
        payment_date: data.payment_date || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await payments.setLead(data.lead || null, {
      transaction,
    });

    await payments.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    return payments;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const paymentsData = data.map((item, index) => ({
      id: item.id || undefined,

      amount: item.amount || null,
      payment_date: item.payment_date || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const payments = await db.payments.bulkCreate(paymentsData, {
      transaction,
    });

    // For each item created, replace relation files

    return payments;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const payments = await db.payments.findByPk(id, {}, { transaction });

    await payments.update(
      {
        amount: data.amount || null,
        payment_date: data.payment_date || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await payments.setLead(data.lead || null, {
      transaction,
    });

    await payments.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    return payments;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const payments = await db.payments.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of payments) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of payments) {
        await record.destroy({ transaction });
      }
    });

    return payments;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const payments = await db.payments.findByPk(id, options);

    await payments.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await payments.destroy({
      transaction,
    });

    return payments;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const payments = await db.payments.findOne({ where }, { transaction });

    if (!payments) {
      return payments;
    }

    const output = payments.get({ plain: true });

    output.lead = await payments.getLead({
      transaction,
    });

    output.organization = await payments.getOrganization({
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

      if (filter.amountRange) {
        const [start, end] = filter.amountRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            amount: {
              ...where.amount,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            amount: {
              ...where.amount,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.payment_dateRange) {
        const [start, end] = filter.payment_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            payment_date: {
              ...where.payment_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            payment_date: {
              ...where.payment_date,
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
          count: await db.payments.count({
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
      : await db.payments.findAndCountAll({
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
          Utils.ilike('payments', 'amount', query),
        ],
      };
    }

    const records = await db.payments.findAll({
      attributes: ['id', 'amount'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['amount', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.amount,
    }));
  }
};
