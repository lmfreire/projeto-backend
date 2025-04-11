# **Projeto Backend - NestJS**

Este é um projeto backend desenvolvido com NestJS, Prisma ORM e PostgreSQL. Ele implementa funcionalidades de gestão de usuários, empresas, produtos, vendas, clientes, fabricantes e itens de produtos.

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
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@email.com",
      "empresa": {
        "id": 1,
        "nome": "Empresa X"
      }
    }
  ]
  ```

#### **Buscar Empresas por Email do Usuário**
- **GET** `/usuario/empresa/:email`
- **Descrição**: Retorna as empresas associadas a um usuário pelo email.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "nome": "Empresa X",
      "cnpj": "12345678000199"
    }
  ]
  ```

---

### **Empresas**

#### **Criar Empresa**
- **POST** `/empresa`
- **Descrição**: Cria uma nova empresa.
- **Body**:
  ```json
  {
    "nome": "Empresa X",
    "cnpj": "12345678000199"
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 1,
    "nome": "Empresa X",
    "cnpj": "12345678000199"
  }
  ```

#### **Listar Empresas**
- **GET** `/empresa`
- **Descrição**: Retorna a lista de todas as empresas.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "nome": "Empresa X",
      "cnpj": "12345678000199"
    }
  ]
  ```

#### **Buscar Empresas do Usuário Autenticado**
- **GET** `/empresa/usuario`
- **Descrição**: Retorna as empresas associadas ao usuário autenticado.
- **Requer Autenticação**: Sim.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "nome": "Empresa X",
      "cnpj": "12345678000199"
    }
  ]
  ```

---

### **Clientes**

#### **Criar Cliente**
- **POST** `/cliente`
- **Descrição**: Cria um novo cliente.
- **Body**:
  ```json
  {
    "empresaId": 1,
    "nome": "Cliente A",
    "cpf": "12345678900",
    "email": "cliente@email.com",
    "endereco": "Rua X, 123",
    "telefone": "999999999"
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 1,
    "nome": "Cliente A",
    "cpf": "12345678900",
    "email": "cliente@email.com"
  }
  ```

#### **Listar Clientes por Empresa**
- **GET** `/cliente/:empresaId`
- **Descrição**: Retorna a lista de clientes de uma empresa específica.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "nome": "Cliente A",
      "cpf": "12345678900",
      "email": "cliente@email.com"
    }
  ]
  ```

#### **Buscar Cliente por CPF**
- **GET** `/cliente/:empresaId/:cpf`
- **Descrição**: Retorna os dados de um cliente específico pelo CPF.
- **Resposta**:
  ```json
  {
    "id": 1,
    "nome": "Cliente A",
    "cpf": "12345678900",
    "email": "cliente@email.com"
  }
  ```

---

### **Fabricantes**

#### **Criar Fabricante**
- **POST** `/fabricante`
- **Descrição**: Cria um novo fabricante.
- **Body**:
  ```json
  {
    "empresaId": 1,
    "nome": "Fabricante A"
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 1,
    "nome": "Fabricante A"
  }
  ```

#### **Listar Fabricantes por Empresa**
- **GET** `/fabricante/:empresaId`
- **Descrição**: Retorna a lista de fabricantes de uma empresa específica.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "nome": "Fabricante A"
    }
  ]
  ```

---

### **Produtos**

#### **Criar Produto**
- **POST** `/produto`
- **Descrição**: Cria um novo produto.
- **Body**:
  ```json
  {
    "nome": "Produto A",
    "precoVenda": 100.0,
    "empresaId": 1,
    "fabricanteId": 1
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 1,
    "nome": "Produto A",
    "precoVenda": 100.0,
    "estoque": 0
  }
  ```

#### **Listar Produtos por Empresa**
- **GET** `/produto/:empresaId`
- **Descrição**: Retorna a lista de produtos de uma empresa específica.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "nome": "Produto A",
      "precoVenda": 100.0,
      "estoque": 0
    }
  ]
  ```

#### **Listar Produtos por Fabricante**
- **GET** `/produto/fabricante/:empresaId/:fabricanteId`
- **Descrição**: Retorna a lista de produtos de um fabricante específico.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "nome": "Produto A",
      "precoVenda": 100.0,
      "estoque": 0
    }
  ]
  ```

---

### **Itens de Produto**

#### **Criar Item de Produto**
- **POST** `/produto_item`
- **Descrição**: Cria um novo item de produto.
- **Body**:
  ```json
  {
    "codigo": "123",
    "descricao": "Item A",
    "produtoId": 1,
    "empresaId": 1
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 1,
    "codigo": "123",
    "descricao": "Item A"
  }
  ```

#### **Listar Itens de Produto**
- **GET** `/produto_item/:empresaId/:produtoId`
- **Descrição**: Retorna a lista de itens de um produto específico.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "codigo": "123",
      "descricao": "Item A"
    }
  ]
  ```

---

### **Vendas**

#### **Criar Venda**
- **POST** `/venda`
- **Descrição**: Cria uma nova venda.
- **Body**:
  ```json
  {
    "empresaId": 1,
    "usuarioId": 1,
    "clienteId": 1,
    "valor_total": 200.0,
    "descricao": "Venda A"
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 1,
    "valor_total": 200.0,
    "descricao": "Venda A"
  }
  ```

#### **Adicionar Itens à Venda**
- **POST** `/venda/item`
- **Descrição**: Adiciona itens a uma venda existente.
- **Body**:
  ```json
  {
    "vendaId": 1,
    "itens": [
      {
        "produtoItemId": 1,
        "quantidade": 2,
        "valor_unitario": 100.0,
        "valor_total": 200.0,
        "desconto": 0
      }
    ]
  }
  ```
- **Resposta**:
  ```json
  {
    "message": "Itens adicionados com sucesso"
  }
  ```

#### **Remover Item da Venda**
- **POST** `/venda/item/remove`
- **Descrição**: Remove um item de uma venda.
- **Body**:
  ```json
  {
    "empresaId": 1,
    "vendaItemId": 1
  }
  ```
- **Resposta**:
  ```json
  {
    "message": "Item removido com sucesso"
  }
  ```

---

## **Testes**

Para executar os testes, use o comando:
```bash
npm run test
```

---

## **Licença**

Este projeto é licenciado sob a [MIT License](LICENSE).