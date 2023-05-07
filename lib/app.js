const api = require('./api-service');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const app=api.app;
api.init();
const health = require("../routes/health");
const invoices = require("../routes/invoices/main");
const listUsers = require("../routes/users/list");

app.use("/health",health);
app.use("/",health);
app.use("/invoices",invoices);
app.use("/users",listUsers);





const updateInvoice=require('./schemas/updateInvoice.js').schema;
const createInvoice=require('./schemas/createInvoice.js').schema;
const idInvoice=require('./schemas/idInvoice.js').schema;

const swaggerOptions=require('../docs/swagger').swaggerOptions;
const swaggerDocs = swaggerJSDoc(swaggerOptions);
swaggerDocs.components = { schemas: { updateInvoice: updateInvoice,createInvoice: createInvoice, idInvoice: idInvoice } };

const swaggerUiOptions = {
    customCss: '.swagger-ui .topbar { display: none }'
  };

  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOptions));



exports.app=app;


