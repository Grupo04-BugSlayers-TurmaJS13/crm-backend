# Nome do Projeto - RH Manager

<br />

<div align="center">
    <img src="/src/assets/logo RH Manager.png" title="Rh Manager logo" width="50%"/>
</div>


<br /><br />

## 1. Descrição


Este projeto consiste em uma API REST desenvolvida em TypeScript utilizando o
framework NestJS, com o objetivo de realizar o gerenciamento de colaboradores de uma
empresa.


------

## 2. Sobre esta API

A aplicação permite criar, listar, atualizar e remover colaboradores, armazenando os dados
em um banco de dados MySQL.

### 2.1. Principais Funcionalidades

1. Liste as principais funcionalidades e as features especiais do sistema
* **Criar colaborador**
    * `POST /colaboradores`
* **Listar colaboradores**
    * `GET /colaboradores`
* **Buscar colaborador por ID**
    * `GET /colaboradores/:id`
* **Buscar colaborador por nome**
    * `GET /colaboradores/nome/:nome`
* **Atualizar colaborador**
    * `PUT /colaboradores`
* **Deletar colaborador**
    * `DELETE /colaboradores/:id`
------

## 3. Diagrama de Classes


<div align="center">
    <img src="/src/assets/diagrama classe.png" title="diagrama de classe" width="50%"/>
</div>

------

## 4. Diagrama Entidade-Relacionamento (DER)


<div align="center">
    <img src="/src/assets/diagrama bd.png" title="diagrama Entidade-Relacionamento" />
</div>



------

## 5. Tecnologias utilizadas

| Item                          | Descrição  |
| ----------------------------- | ---------- |
| **Servidor**                  | Node JS    |
| **Linguagem de programação**  | TypeScript |
| **Framework**                 | Nest JS    |
| **ORM**                       | TypeORM    |
| **Banco de dados Relacional** | MySQL      |

------

## 6. Configuração e Execução

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure o banco de dados no arquivo `app.module.ts`
4. Execute a aplicação: `npm run start:dev`
