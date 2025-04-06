import swaggerJSDoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RSI Product Management API',
      version: '1.0.0',
      description: 'API for managing products, materials, and processes',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Local server',
      },
      {
        url: 'https://rsi-backend-us1f.onrender.com',
        description: 'Production server',
      }
    ],
    tags: [
      { name: 'Products', description: 'Product management' },
      { name: 'Origins', description: 'Product origin management' },
      { name: 'Colors', description: 'Color options management' },
      { name: 'Types', description: 'Product type management' },
      { name: 'Categories', description: 'Category management' },
      { name: 'Materials', description: 'Raw material management' },
      { name: 'Processes', description: 'Manufacturing process management' },
    ],
        components: {
      schemas: {
        Type: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439013' },
            typeName: { type: 'string', example: 'Apparel' },
            CreatedDate: { type: 'string', format: 'date-time', example: '2025-04-06T15:35:07.870Z' }
          }
        },
        Color: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439012' },
            colorName: { type: 'string', example: 'Red' },
            CreatedDate: { type: 'string', format: 'date-time', example: '2025-04-06T15:35:07.870Z' }
          }
        },
        Category: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439014' },
            categoryName: { type: 'string', example: 'Clothing' },
            CreatedDate: { type: 'string', format: 'date-time', example: '2025-04-06T15:35:07.870Z' }
          }
        },
        RawMaterial: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439015' },
            rawMaterialName: { type: 'string', example: 'Organic Cotton' },
            CreatedDate: { type: 'string', format: 'date-time', example: '2025-04-06T15:35:07.870Z' }
          }
        },
        ManufacturingProcess: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439016' },
            manufactoringProcessName: { type: 'string', example: 'Hand Weaving' },
            CreatedDate: { type: 'string', format: 'date-time', example: '2025-04-06T15:35:07.870Z' }
          }
        },
        Product: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            ProductName: { type: 'string', example: 'Organic Cotton T-Shirt' },
            ProductLink: { type: 'string', example: 'https://example.com/product' },
            Desc: { type: 'string', example: 'Eco-friendly clothing item' },
            Category: {
              type: 'array',
              items: { $ref: '#/components/schemas/Category' }
            },
            RawMaterial: {
              type: 'array',
              items: { $ref: '#/components/schemas/RawMaterial' }
            },
            Origin: {
              type: 'array',
              items: { $ref: '#/components/schemas/Origin' }
            },
            Type: {
              type: 'array',
              items: { $ref: '#/components/schemas/Type' }
            },
            Color: {
              type: 'array',
              items: { $ref: '#/components/schemas/Color' }
            },
            ManufactoringProcess: {
              type: 'array',
              items: { $ref: '#/components/schemas/ManufacturingProcess' }
            },
            CreatedDate: { type: 'string', format: 'date-time', example: '2025-04-06T15:35:07.870Z' }
          }
        },
        Origin: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439012' },
            originName: { type: 'string', example: 'Canada' },
            CreatedDate: { type: 'string', format: 'date-time', example: '2025-04-06T15:35:07.870Z' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'An error occurred' },
            details: { type: 'string', example: 'Invalid input data' },
            timestamp: { type: 'string', format: 'date-time', example: '2025-04-06T15:35:07.870Z' }
          }
        }
      }
    }
  },
  apis: [
    path.join(__dirname, 'index.js') 
    // path.join(__dirname, 'routes/*.js')
  ]
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;