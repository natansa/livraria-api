const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Livraria API',
      version: '1.0.0',
      description: 'Documentação da API da Livraria',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Autor: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID do autor',
            },
            nome: {
              type: 'string',
              description: 'Nome do autor',
            },
          },
          required: ['nome'],
        },
        Cliente: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID do cliente',
            },
            nome: {
              type: 'string',
              description: 'Nome do cliente',
            },
            email: {
              type: 'string',
              description: 'Email do cliente',
            },
            telefone: {
              type: 'string',
              description: 'Telefone do cliente',
            },
            endereco: {
              type: 'string',
              description: 'Endereço do cliente',
            },
          },
          required: ['nome', 'email', 'telefone', 'endereco'],
        },
        Livro: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID do livro',
            },
            titulo: {
              type: 'string',
              description: 'Título do livro',
            },
            autorId: {
              type: 'string',
              description: 'ID do autor do livro',
            },
          },
          required: ['titulo', 'autorId'],
        },
        Venda: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID da venda',
            },
            clienteId: {
              type: 'string',
              description: 'ID do cliente',
            },
            livroId: {
              type: 'string',
              description: 'ID do livro',
            },
            dataVenda: {
              type: 'string',
              description: 'Data da venda',
              format: 'date-time',
            },
          },
          required: ['clienteId', 'livroId', 'dataVenda'],
        },
        LivroInfo: {
          type: 'object',
          properties: {
            livroId: {
              type: 'string',
              description: 'ID do livro',
            },
            descricao: {
              type: 'string',
              description: 'Descrição do livro',
            },
            paginas: {
              type: 'integer',
              description: 'Número de páginas do livro',
            },
            editora: {
              type: 'string',
              description: 'Editora do livro',
            },
            avaliacoes: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Avaliações do livro',
            },
          },
          required: ['livroId', 'descricao', 'paginas', 'editora'],
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
