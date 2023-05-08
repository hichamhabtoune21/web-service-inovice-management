const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'API',
        description: 'API for invoices',
      },
      securityDefinitions: {
        basicAuth: {
          type: 'basic',
        },
      },
      security: [
        {
          basicAuth: [],
        },
      ],
    },
    apis: ['./routes/*.js', './routes/invoices/*.js'], // Path to the API routes


};
exports.swaggerOptions = swaggerOptions;
