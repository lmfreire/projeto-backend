# Projeto Backend - NestJS

Este é um projeto backend desenvolvido com NestJS, Prisma ORM e PostgreSQL. Ele implementa funcionalidades de gestão de usuários, empresas, produtos e vendas.

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
- **POST** `/usuarios`
- **Descrição**: Cria um novo usuário.
- **Body**:
  ```json
  {
    "nome": "João Silva",
    "email": "joao@email.com",
    "senha": "senha123"
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

#### **Listar Usuários**
- **GET** `/usuarios`
- **Descrição**: Retorna a lista de todos os usuários.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@email.com"
    }
  ]
  ```

---

### **Empresas**

#### **Criar Empresa**
- **POST** `/empresas`
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
- **GET** `/empresas`
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

---

### **Produtos**

#### **Criar Produto**
- **POST** `/produtos`
- **Descrição**: Cria um novo produto.
- **Body**:
  ```json
  {
    "nome": "Produto A",
    "preco": 100.0,
    "estoque": 50
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 1,
    "nome": "Produto A",
    "preco": 100.0,
    "estoque": 50
  }
  ```

#### **Listar Produtos**
- **GET** `/produtos`
- **Descrição**: Retorna a lista de todos os produtos.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "nome": "Produto A",
      "preco": 100.0,
      "estoque": 50
    }
  ]
  ```

---

### **Vendas**

#### **Criar Venda**
- **POST** `/vendas`
- **Descrição**: Cria uma nova venda.
- **Body**:
  ```json
  {
    "cliente": "Cliente X",
    "itens": [
      {
        "produtoId": 1,
        "quantidade": 2
      }
    ]
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 1,
    "cliente": "Cliente X",
    "valorTotal": 200.0,
    "itens": [
      {
        "produtoId": 1,
        "quantidade": 2
      }
    ]
  }
  ```

#### **Listar Vendas**
- **GET** `/vendas`
- **Descrição**: Retorna a lista de todas as vendas.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "cliente": "Cliente X",
      "valorTotal": 200.0,
      "itens": [
        {
          "produtoId": 1,
          "quantidade": 2
        }
      ]
    }
  ]
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