const app = require('../lib/app').app;
const request = require("supertest");

const models = require('../lib/models/models.js');
const User = models.User;
const Invoice = models.Invoice;

const crypto = require('crypto')
const password = "password";
const newUser = {
  Email: 'testuser@example.com',
  Password: crypto.createHash('md5').update(password).digest("hex"),
  Username: "test",
  Name: "test",
  Surname: "test",
  Role: "Admin",
}
const forbiddenUser = {
  Email: 'testforbiddenuser@example.com',
  Password: crypto.createHash('md5').update(password).digest("hex"),
  Username: "test",
  Name: "test",
  Surname: "test",
  Role: null,
}

const username = "testuser@example.com";
const basic = Buffer.from('testuser@example.com:' + password).toString('base64')
const basic_forbidden = Buffer.from('testforbiddenuser@example.com:' + password).toString('base64')


const newInvoice = {
  "ID_Invoice": 999999,
  "Progressive number": 10101,
  "Issuing date": "2023-12-10",
  "Business name": "",
  "Amount": 10,
  "Payment type": "Cash",
}

describe('Invoice: list', () => {
  let testUser;
  let testInvoice;
  let testForbiddenUser;
  beforeEach(async () => {
    testUser = await User.create(newUser);
    testForbiddenUser = await User.create(forbiddenUser);

    testInvoice = await Invoice.create(newInvoice)
  });

  afterEach(async () => {
    await User.destroy({ where: { ID_User: testUser.ID_User } });
    await User.destroy({ where: { ID_User: testForbiddenUser.ID_User } });
    await Invoice.destroy({ where: { ID_Invoice: testInvoice.ID_Invoice } });

  });

  test('should respond with 200 status code ', async () => {
    await request(app)
      .get('/invoices/list')
      .set('Authorization', 'Basic ' + basic)
      .expect(200)
  })

  test('should respond with 401 if not authenticated ', async () => {
    await request(app)
      .get('/invoices/list')
      .set('Authorization', 'Basic ' + "dGVzdDp0ZXN0")
      .expect(401)
  })

  test('should respond with 403 if user has not READ permission', async () => {
    await request(app)
      .get('/invoices/list')
      .set('Authorization', 'Basic ' + basic_forbidden)
      .expect(403)
  })


})

describe('Invoice: update invoice', () => {
  let testUser;
  let testInvoice;
  let testForbiddenUser;
  beforeEach(async () => {
    testUser = await User.create(newUser);
    testForbiddenUser = await User.create(forbiddenUser);

    testInvoice = await Invoice.create(newInvoice)
  });

  afterEach(async () => {
    await User.destroy({ where: { ID_User: testUser.ID_User } });
    await User.destroy({ where: { ID_User: testForbiddenUser.ID_User } });
    await Invoice.destroy({ where: { ID_Invoice: testInvoice.ID_Invoice } });

  });

  test('should respond with 200 status code ', async () => {
    await request(app)
      .patch('/invoices/update')
      .send(newInvoice)
      .set('Authorization', 'Basic ' + basic)
      .expect(200)
  })
  test('should respond with 400 if user has not respected schema', async () => {
    await request(app)
      .patch('/invoices/update')
      .set('Authorization', 'Basic ' + basic)
      .expect(400)
  })
  test('should respond with 401 if not authenticated ', async () => {
    await request(app)
      .patch('/invoices/update')
      .send(newInvoice)
      .set('Authorization', 'Basic ' + "dGVzdDp0ZXN0")
      .expect(401)
  })

  test('should respond with 403 if user has not UPDATE permission', async () => {
    await request(app)
      .patch('/invoices/update')
      .send(newInvoice)
      .set('Authorization', 'Basic ' + basic_forbidden)
      .expect(403)
  })
})

describe('Invoice: create invoice', () => {
  let testUser;
  let testForbiddenUser;
  beforeEach(async () => {
    testUser = await User.create(newUser);
    testForbiddenUser = await User.create(forbiddenUser);
  });

  afterEach(async () => {
    await User.destroy({ where: { ID_User: testUser.ID_User } });
    await User.destroy({ where: { ID_User: testForbiddenUser.ID_User } });
    await Invoice.destroy({ where: { ID_Invoice: newInvoice.ID_Invoice } });
  });

  test('should respond with 201 status code ', async () => {
    await request(app)
      .put('/invoices/create')
      .send(newInvoice)
      .set('Authorization', 'Basic ' + basic)
      .expect(201)
  })
  test('should respond with 400 if user has not respected schema', async () => {
    await request(app)
      .put('/invoices/create')
      .set('Authorization', 'Basic ' + basic)
      .expect(400)
  })
  test('should respond with 401 if not authenticated ', async () => {
    await request(app)
      .put('/invoices/create')
      .send(newInvoice)
      .set('Authorization', 'Basic ' + "dGVzdDp0ZXN0")
      .expect(401)
  })

  test('should respond with 403 if user has not CREATE permission', async () => {
    await request(app)
      .put('/invoices/create')
      .send(newInvoice)
      .set('Authorization', 'Basic ' + basic_forbidden)
      .expect(403)
  })


})

describe('Invoice: remove invoice', () => {
  let testUser;
  let testInvoice;
  let testForbiddenUser;
  beforeEach(async () => {
    testUser = await User.create(newUser);
    testForbiddenUser = await User.create(forbiddenUser);
    testInvoice = await Invoice.create(newInvoice)
  });

  afterEach(async () => {
    await User.destroy({ where: { ID_User: testUser.ID_User } });
    await User.destroy({ where: { ID_User: testForbiddenUser.ID_User } });
    await Invoice.destroy({ where: { ID_Invoice: testInvoice.ID_Invoice } });

  });

  test('should respond with 200 status code ', async () => {
    await request(app)
      .delete('/invoices/remove')
      .send({ ID_Invoice: testInvoice.ID_Invoice })
      .set('Authorization', 'Basic ' + basic)
      .expect(200)
  })

  test('should respond with 400 if user has not respected schema', async () => {
    await request(app)
    .delete('/invoices/remove')
    .set('Authorization', 'Basic ' + basic)
      .expect(400)
  })

  test('should respond with 401 if not authenticated ', async () => {
    await request(app)
    .delete('/invoices/remove')
    .send({ ID_Invoice: testInvoice.ID_Invoice })
      .set('Authorization', 'Basic ' + "dGVzdDp0ZXN0")
      .expect(401)
  })

  test('should respond with 403 if user has not DELETE permission', async () => {
    await request(app)
    .delete('/invoices/remove')
    .send({ ID_Invoice: testInvoice.ID_Invoice })
      .set('Authorization', 'Basic ' + basic_forbidden)
      .expect(403)
  })


})

describe('Invoice: search invoice', () => {
  let testUser;
  let testInvoice;
  let testForbiddenUser;
  beforeEach(async () => {
    testUser = await User.create(newUser);
    testForbiddenUser = await User.create(forbiddenUser);
    testInvoice = await Invoice.create(newInvoice)
  });

  afterEach(async () => {
    await User.destroy({ where: { ID_User: testUser.ID_User } });
    await User.destroy({ where: { ID_User: testForbiddenUser.ID_User } });
    await Invoice.destroy({ where: { ID_Invoice: testInvoice.ID_Invoice } });

  });

  test('should respond with 200 status code ', async () => {
    await request(app)
      .post('/invoices/search')
      .send({ ID_Invoice: testInvoice.ID_Invoice })
      .set('Authorization', 'Basic ' + basic)
      .expect(200)
  })

  test('should respond with 400 if user has not respected schema', async () => {
    await request(app)
      .post('/invoices/search')
      .set('Authorization', 'Basic ' + basic)
      .expect(400)
  })

  test('should respond with 401 if not authenticated ', async () => {
    await request(app)
      .post('/invoices/search')
      .send({ ID_Invoice: testInvoice.ID_Invoice })
      .set('Authorization', 'Basic ' + "dGVzdDp0ZXN0")
      .expect(401)
  })

  test('should respond with 403 if user has not READ permission', async () => {
    await request(app)
      .post('/invoices/search')
      .send({ ID_Invoice: testInvoice.ID_Invoice })
      .set('Authorization', 'Basic ' + basic_forbidden)
      .expect(403)
  })
})


