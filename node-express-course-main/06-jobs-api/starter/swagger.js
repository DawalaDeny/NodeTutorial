const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

const config = {
    info: {
        title: 'Blog API Documentation',
        description: '',
    },
    tags: ["auth", "jobs" ],
    host: 'localhost:80',
    schemes: ['http', 'https'],
};

swaggerAutogen(outputFile, endpointsFiles, config);
