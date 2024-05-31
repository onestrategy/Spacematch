const db = require('../models');
const Users = db.users;

const Departments = db.departments;

const FollowUps = db.follow_ups;

const Leads = db.leads;

const Payments = db.payments;

const Organizations = db.organizations;

const DepartmentsData = [
  {
    name: 'BD & Sales',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Marketing',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Community Managers',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Housekeeping',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Accounts',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const FollowUpsData = [
  {
    follow_up_date: new Date('2023-10-01T10:00:00Z'),

    notes: 'Follow up with John Doe about the proposal.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    follow_up_date: new Date('2023-10-02T11:00:00Z'),

    notes: 'Check in with Jane Smith regarding the contract.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    follow_up_date: new Date('2023-10-03T12:00:00Z'),

    notes: 'Discuss next steps with Alice Johnson.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    follow_up_date: new Date('2023-10-04T13:00:00Z'),

    notes: 'Send additional information to Bob Brown.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    follow_up_date: new Date('2023-10-05T14:00:00Z'),

    notes: 'Schedule a meeting with Charlie Davis.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const LeadsData = [
  {
    name: 'John Doe',

    email: 'johndoe@example.com',

    phone: '1234567890',

    status: 'in_progress',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Jane Smith',

    email: 'janesmith@example.com',

    phone: '0987654321',

    status: 'closed',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Alice Johnson',

    email: 'alicejohnson@example.com',

    phone: '1122334455',

    status: 'closed',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Bob Brown',

    email: 'bobbrown@example.com',

    phone: '6677889900',

    status: 'new',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Charlie Davis',

    email: 'charliedavis@example.com',

    phone: '4455667788',

    status: 'closed',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const PaymentsData = [
  {
    amount: 1000,

    payment_date: new Date('2023-10-01T15:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    amount: 2000,

    payment_date: new Date('2023-10-02T16:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    amount: 1500,

    payment_date: new Date('2023-10-03T17:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    amount: 2500,

    payment_date: new Date('2023-10-04T18:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    amount: 3000,

    payment_date: new Date('2023-10-05T19:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const OrganizationsData = [
  {
    name: 'AppWizzy',
  },

  {
    name: 'CoWork Inc.',
  },

  {
    name: 'SharedSpaces',
  },

  {
    name: 'OfficeHub',
  },

  {
    name: 'WorkNest',
  },
];

// Similar logic for "relation_many"

async function associateUserWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setOrganization) {
    await User0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setOrganization) {
    await User1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setOrganization) {
    await User2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setOrganization) {
    await User3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User4 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (User4?.setOrganization) {
    await User4.setOrganization(relatedOrganization4);
  }
}

// Similar logic for "relation_many"

async function associateDepartmentWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Department0 = await Departments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Department0?.setOrganization) {
    await Department0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Department1 = await Departments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Department1?.setOrganization) {
    await Department1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Department2 = await Departments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Department2?.setOrganization) {
    await Department2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Department3 = await Departments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Department3?.setOrganization) {
    await Department3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Department4 = await Departments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Department4?.setOrganization) {
    await Department4.setOrganization(relatedOrganization4);
  }
}

async function associateFollowUpWithLead() {
  const relatedLead0 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const FollowUp0 = await FollowUps.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (FollowUp0?.setLead) {
    await FollowUp0.setLead(relatedLead0);
  }

  const relatedLead1 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const FollowUp1 = await FollowUps.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (FollowUp1?.setLead) {
    await FollowUp1.setLead(relatedLead1);
  }

  const relatedLead2 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const FollowUp2 = await FollowUps.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (FollowUp2?.setLead) {
    await FollowUp2.setLead(relatedLead2);
  }

  const relatedLead3 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const FollowUp3 = await FollowUps.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (FollowUp3?.setLead) {
    await FollowUp3.setLead(relatedLead3);
  }

  const relatedLead4 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const FollowUp4 = await FollowUps.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (FollowUp4?.setLead) {
    await FollowUp4.setLead(relatedLead4);
  }
}

async function associateFollowUpWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const FollowUp0 = await FollowUps.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (FollowUp0?.setOrganization) {
    await FollowUp0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const FollowUp1 = await FollowUps.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (FollowUp1?.setOrganization) {
    await FollowUp1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const FollowUp2 = await FollowUps.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (FollowUp2?.setOrganization) {
    await FollowUp2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const FollowUp3 = await FollowUps.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (FollowUp3?.setOrganization) {
    await FollowUp3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const FollowUp4 = await FollowUps.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (FollowUp4?.setOrganization) {
    await FollowUp4.setOrganization(relatedOrganization4);
  }
}

async function associateLeadWithAssigned_to() {
  const relatedAssigned_to0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead0 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Lead0?.setAssigned_to) {
    await Lead0.setAssigned_to(relatedAssigned_to0);
  }

  const relatedAssigned_to1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead1 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Lead1?.setAssigned_to) {
    await Lead1.setAssigned_to(relatedAssigned_to1);
  }

  const relatedAssigned_to2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead2 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Lead2?.setAssigned_to) {
    await Lead2.setAssigned_to(relatedAssigned_to2);
  }

  const relatedAssigned_to3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead3 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Lead3?.setAssigned_to) {
    await Lead3.setAssigned_to(relatedAssigned_to3);
  }

  const relatedAssigned_to4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead4 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Lead4?.setAssigned_to) {
    await Lead4.setAssigned_to(relatedAssigned_to4);
  }
}

async function associateLeadWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Lead0 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Lead0?.setOrganization) {
    await Lead0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Lead1 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Lead1?.setOrganization) {
    await Lead1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Lead2 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Lead2?.setOrganization) {
    await Lead2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Lead3 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Lead3?.setOrganization) {
    await Lead3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Lead4 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Lead4?.setOrganization) {
    await Lead4.setOrganization(relatedOrganization4);
  }
}

async function associatePaymentWithLead() {
  const relatedLead0 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Payment0 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Payment0?.setLead) {
    await Payment0.setLead(relatedLead0);
  }

  const relatedLead1 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Payment1 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Payment1?.setLead) {
    await Payment1.setLead(relatedLead1);
  }

  const relatedLead2 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Payment2 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Payment2?.setLead) {
    await Payment2.setLead(relatedLead2);
  }

  const relatedLead3 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Payment3 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Payment3?.setLead) {
    await Payment3.setLead(relatedLead3);
  }

  const relatedLead4 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Payment4 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Payment4?.setLead) {
    await Payment4.setLead(relatedLead4);
  }
}

async function associatePaymentWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Payment0 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Payment0?.setOrganization) {
    await Payment0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Payment1 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Payment1?.setOrganization) {
    await Payment1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Payment2 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Payment2?.setOrganization) {
    await Payment2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Payment3 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Payment3?.setOrganization) {
    await Payment3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Payment4 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Payment4?.setOrganization) {
    await Payment4.setOrganization(relatedOrganization4);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Departments.bulkCreate(DepartmentsData);

    await FollowUps.bulkCreate(FollowUpsData);

    await Leads.bulkCreate(LeadsData);

    await Payments.bulkCreate(PaymentsData);

    await Organizations.bulkCreate(OrganizationsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithOrganization(),

      // Similar logic for "relation_many"

      await associateDepartmentWithOrganization(),

      await associateFollowUpWithLead(),

      await associateFollowUpWithOrganization(),

      await associateLeadWithAssigned_to(),

      await associateLeadWithOrganization(),

      await associatePaymentWithLead(),

      await associatePaymentWithOrganization(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('departments', null, {});

    await queryInterface.bulkDelete('follow_ups', null, {});

    await queryInterface.bulkDelete('leads', null, {});

    await queryInterface.bulkDelete('payments', null, {});

    await queryInterface.bulkDelete('organizations', null, {});
  },
};
