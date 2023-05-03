const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API documentation',
            version: '1.0.0',
            description: 'Documentation for the API',
            contact: {
                name: 'Your name',
                email: 'your.email@example.com',
                url: 'https://example.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server'
            }
        ]
    },
    apis: ['../routes/*.js'] // Path to the API routes
};
exports.swaggerOptions=swaggerOptions;
