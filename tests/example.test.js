const app=require('../lib/app').app;
const request =require("supertest");
describe('should respond with 200 status code', () => {
    test('', async () => {
      await request(app)
      .get('/health')
      .expect(200)
       })
})

describe('Invoice tests', () => {
  test('should respond with 200 status code', async () => {
    await request(app)
    .get('/invoices/list')
    .set('Authorization', 'Basic ' + 'YWRtaW5AYWRtaW4uY29tOmFkbWlu') 
    .expect(200)
     })
})


