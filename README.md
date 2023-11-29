<p align="center">
  <h1 align="center">Desafio técnico FullStack CEFIS - Backend</h1>
</p>

Esta é uma API server desenvolvida como parte do desafio técnico FullStack proposto pela CEFIS. Os endpoints comtemplam todas as funcionalidades requeridas para o teste de nível Júnior.

### 👀 Aplicações que está consumindo esta API 
* **Frontend: <a href="https://github.com/LazaroHenrique3/desafio-fullstack-cefis-frontend">Desafio FullStack - FrontEnd</a>**

## 🛠️ Construído com

* **TypeScript**
* **Node**
* **Express**
* **Prisma ORM**
* **PostgreSQL/SQLite**

##  🚀 Rodar o projeto localmente em sua máquina

### Requisitos

* **Node.js 16.17^

### Instruções

1 - Clone o projeto 
  ```sh
   git clone https://github.com/LazaroHenrique3/desafio-fullstack-cefis-api.git
   cd desafio-fullstack-cefis-api
   ```
2 - Instalar dependências
 ```sh
   npm install
   ```
3 - Adicione as variáveis de ambiente

Renomeie o `.env.example` para `.env` e adicione os valores necessários.

Foi utilizado o SQLite no ambiente no desenvolvimento, sendo assim o `env` ficará semelhante a isso:
 ```sh
   DATABASE_URL="file:.././database.sqlite"
   PROVIDER_NAME="sqlite"
   PORT=5000
   ```

4 - Inicialize o banco com o prisma 
 ```sh
   npx prisma migrate dev --name init 
   ```

5 - Inicialize o server da API
```sh
   npm run dev
   ```

Após a inicialização o server estará disponivel no `http://localhost:5000`

## 📚 Documentação
Para acessar a documentação da API, vá até o navegador e acesse:

`http://localhost:5000/api-docs`

