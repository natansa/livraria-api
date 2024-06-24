# Livraria API

A Livraria API é uma aplicação que permite gerenciar autores, clientes, livros e vendas de uma livraria. A API fornece endpoints para criar, atualizar, deletar e consultar informações relacionadas a autores, clientes, livros e vendas. Além disso, implementa um mecanismo de autenticação e autorização para garantir que apenas usuários autorizados possam acessar determinados recursos.

## Funcionalidades

- **Autenticação e Autorização**:
  - Autenticação básica (Basic Auth) com verificação de usuário e senha.
  - Usuário administrador com acesso a todos os endpoints.
  - Usuários comuns com acesso limitado a determinados endpoints.

- **Gerenciamento de Autores**:
  - Criar, atualizar, deletar e consultar autores.

- **Gerenciamento de Clientes**:
  - Criar, atualizar, deletar e consultar clientes.

- **Gerenciamento de Livros**:
  - Criar, atualizar, deletar e consultar livros.
  - Adicionar e remover informações detalhadas sobre livros.
  - Adicionar e remover avaliações de livros.

- **Gerenciamento de Vendas**:
  - Criar vendas.
  - Consultar vendas de clientes específicos.
  - Consultar vendas por livro e autor.

## Endpoints

### Autores

- **POST /autor**: Cria um novo autor.
- **PUT /autor**: Atualiza um autor existente.
- **DELETE /autor/:autorId**: Deleta um autor pelo ID.
- **GET /autor**: Retorna todos os autores.
- **GET /autor/:autorId**: Retorna um autor pelo ID.

### Clientes

- **POST /cliente**: Cria um novo cliente.
- **PUT /cliente**: Atualiza um cliente existente.
- **DELETE /cliente/:clienteId**: Deleta um cliente pelo ID.
- **GET /cliente**: Retorna todos os clientes.
- **GET /cliente/:clienteId**: Retorna um cliente pelo ID.

### Livros

- **POST /livro**: Cria um novo livro.
- **PUT /livro**: Atualiza um livro existente.
- **DELETE /livro/:livroId**: Deleta um livro pelo ID.
- **GET /livro**: Retorna todos os livros.
- **GET /livro/:livroId**: Retorna um livro pelo ID.
- **POST /livro/info**: Adiciona informações detalhadas a um livro.
- **PUT /livro/info**: Atualiza informações detalhadas de um livro.
- **DELETE /livro/info/:livroId**: Deleta informações detalhadas de um livro pelo ID.
- **POST /livro/:livroId/avaliacao**: Adiciona uma avaliação a um livro.
- **DELETE /livro/:livroId/avaliacao/:index**: Deleta uma avaliação de um livro pelo índice.

### Vendas

- **POST /venda**: Cria uma nova venda.
- **GET /venda**: Retorna todas as vendas.
- **GET /venda/:vendaId**: Retorna uma venda pelo ID.
- **GET /venda/cliente/:clienteId**: Retorna todas as vendas de um cliente específico (apenas o próprio cliente pode consultar suas vendas).
- **GET /venda/livro/:livroId**: Retorna todas as vendas de um livro específico.
- **GET /venda/autor/:autorId**: Retorna todas as vendas de livros de um autor específico.

## Autenticação

A autenticação é feita via Basic Auth. O usuário deve enviar seu e-mail e senha no cabeçalho de autorização das requisições. O usuário administrador tem acesso a todos os endpoints, enquanto os usuários comuns têm acesso limitado.

- **Usuário Administrador**:
  - Usuário: `admin`
  - Senha: `desafio-igti-nodejs`

## Documentação da API

A documentação da API está disponível no endpoint `/swagger` e pode ser acessada através de um navegador web. A documentação é gerada automaticamente utilizando o Swagger.

## Como Executar

### Requisitos

- Node.js
- Docker e Docker Compose

### Passos para Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/livraria-api.git
   cd livraria-api

2. Instale as dependências:
   ```bash
   npm install

3. Configure as variáveis de ambiente, se necessário.

4. Inicie a aplicação utilizando Docker Compose:
   ```bash
   docker-compose up --build -d

5. Acesse a documentação da API em:
   ```bash
   http://localhost:3000/swagger

6. Pare a aplicação utilizando Docker Compose:
   ```bash
   docker-compose down

7. A aplicação usa o MongoDB e o Postgres no Docker.

8. Os dados da aplicação são inicializados a cada inicialização da aplicação através dos arquivos ./init-mongo.js ./init-postgres.sql