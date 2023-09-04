const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
      title: 'Jobs API',
      description: 'API voor jobbeheer',
    },
    host: 'localhost:80',
    schemes: ['http'],
  };

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);