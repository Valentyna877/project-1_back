// import swaggerJsdoc from 'swagger-jsdoc';

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Leleka API',
//       version: '1.0.0',
//       description: 'REST API для командного проєкту (Next + Node)',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3030/api',
//         description: 'Local server',
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT',
//         },
//       },
//       responses: {
//         BadRequest: {
//           description: 'Invalid request parameters',
//         },
//         Unauthorized: {
//           description: 'Authentication required or invalid token',
//         },
//         NotFound: {
//           description: 'Resource not found',
//         },
//         InternalServerError: {
//           description: 'Unexpected server error',
//         },
//       },
//     },
//     security: [{ bearerAuth: [] }],
//   },
//   apis: ['./docs/*.js'],
// };

// export const swaggerSpec = swaggerJsdoc(options);
