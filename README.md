# **Projeto Backend - NestJS**

Este é um projeto backend desenvolvido com **NestJS**, **Prisma ORM** e **PostgreSQL**. Ele implementa funcionalidades para gestão de **usuários**, **empresas**, **produtos**, **vendas**, **clientes**, **fabricantes** e **itens de produtos**. O objetivo principal é fornecer uma API robusta e escalável para atender às necessidades de um sistema de gestão empresarial.

---

## **Funcionalidades**

- **Autenticação**: Login com geração de token JWT.
- **Gestão de Usuários**: Criação, listagem e autenticação de usuários.
- **Gestão de Empresas**: Criação e listagem de empresas.
- **Gestão de Clientes**: Criação, listagem e busca de clientes por CPF.
- **Gestão de Fabricantes**: Criação e listagem de fabricantes.
- **Gestão de Produtos**: Criação, listagem e busca de produtos por fabricante.
- **Gestão de Itens de Produtos**: Criação e listagem de itens de produtos.
- **Gestão de Vendas**: Criação de vendas, adição e remoção de itens, e finalização de vendas.

---

## **Instalação**

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd projeto-backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env` com as variáveis de ambiente necessárias:
   ```env
   DATABASE_URL=postgresql://<usuario>:<senha>@<host>:<porta>/<banco>
   JWT_SECRET=<sua_chave_secreta>
   ```

4. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor:
   ```bash
   npm run start:dev
   ```

---

## **Endpoints**

### **Autenticação**

#### **Login**
- **POST** `/auth/login`
- **Descrição**: Realiza o login de um usuário e retorna um token JWT.
- **Body**:
  ```json
  {
    "email": "usuario@email.com",
    "senha": "senha123"
  }
  ```
- **Resposta**:
  ```json
  {
    "token": "jwt_token_gerado"
  }
  ```

---

### **Usuários**

#### **Criar Usuário**
- **POST** `/usuario`
- **Descrição**: Cria um novo usuário.
- **Body**:
  ```json
  {
    "nome": "João Silva",
    "email": "joao@email.com",
    "senha": "senha123",
    "empresaId": 1
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com"
  }
  ```

#### **Listar Usuários por Empresa**
- **GET** `/usuario/:empresaId`
- **Descrição**: Retorna a lista de usuários de uma empresa específica.

#### **Buscar Empresas por Email do Usuário**
- **GET** `/usuario/empresa/:email`
- **Descrição**: Retorna as empresas associadas a um usuário pelo email.

---

### **Empresas**

#### **Criar Empresa**
- **POST** `/empresa`
- **Descrição**: Cria uma nova empresa.

#### **Listar Empresas**
- **GET** `/empresa`
- **Descrição**: Retorna a lista de todas as empresas.

#### **Buscar Empresas do Usuário Autenticado**
- **GET** `/empresa/usuario`
- **Descrição**: Retorna as empresas associadas ao usuário autenticado.

---

### **Clientes**

#### **Criar Cliente**
- **POST** `/cliente`
- **Descrição**: Cria um novo cliente.

#### **Listar Clientes por Empresa**
- **GET** `/cliente/:empresaId`
- **Descrição**: Retorna a lista de clientes de uma empresa específica.

#### **Buscar Cliente por CPF**
- **GET** `/cliente/:empresaId/:cpf`
- **Descrição**: Retorna os dados de um cliente específico pelo CPF.

---

### **Fabricantes**

#### **Criar Fabricante**
- **POST** `/fabricante`
- **Descrição**: Cria um novo fabricante.

#### **Listar Fabricantes por Empresa**
- **GET** `/fabricante/:empresaId`
- **Descrição**: Retorna a lista de fabricantes de uma empresa específica.

---

### **Produtos**

#### **Criar Produto**
- **POST** `/produto`
- **Descrição**: Cria um novo produto.

#### **Listar Produtos por Empresa**
- **GET** `/produto/:empresaId`
- **Descrição**: Retorna a lista de produtos de uma empresa específica.

#### **Listar Produtos por Fabricante**
- **GET** `/produto/fabricante/:empresaId/:fabricanteId`
- **Descrição**: Retorna a lista de produtos de um fabricante específico.

---

### **Itens de Produto**

#### **Criar Item de Produto**
- **POST** `/produto_item`
- **Descrição**: Cria um novo item de produto.

#### **Listar Itens de Produto**
- **GET** `/produto_item/:empresaId/:produtoId`
- **Descrição**: Retorna a lista de itens de um produto específico.

---

### **Vendas**

#### **Criar Venda**
- **POST** `/venda`
- **Descrição**: Cria uma nova venda.

#### **Adicionar Itens à Venda**
- **POST** `/venda/item`
- **Descrição**: Adiciona itens a uma venda existente.

#### **Remover Item da Venda**
- **POST** `/venda/item/remove`
- **Descrição**: Remove um item de uma venda.

#### **Finalizar Venda**
- **PATCH** `/venda/:empresaId/:vendaId`
- **Descrição**: Finaliza uma venda.

---

## **Testes**

Para executar os testes, use o comando:
```bash
npm run test
```
