# 📚 COLA CRUD - SENAI

> O projeto inteiro segue esse padrão. Se esquecer alguma coisa, siga esta ordem.

---

# 📁 Estrutura

```
app.js
   ↓
Routes
   ↓
Controller
   ↓
DAO
   ↓
Banco
```

## O que cada um faz

**app.js**
- Inicia a API.
- Configura JSON.
- Configura CORS.
- Importa as rotas.
- Dá `listen()`.

**Routes**
- Recebe a URL.
- Chama a Controller.
- Não faz SQL.

**Controller**
- Valida.
- Organiza os dados.
- Chama o DAO.
- Retorna JSON.

**DAO**
- Só faz SQL.

---

# 💻 Terminal

```bash
npm init -y

npm i express cors body-parser mysql2 knex swagger-ui-express yamljs

node app.js
```

---

# 🗄 Banco de Dados

Criar banco

```sql
CREATE DATABASE db_nome;
USE db_nome;
```

## Nome das tabelas

```
tbl_filme
tbl_genero
tbl_pessoa
```

## ID

```sql
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT
```

## Foreign Key

Sempre:

```sql
id_genero

id_filme

id_classificacao
```

## Constraint

Sempre nomear:

```sql
CONSTRAINT fk_filme_genero

FOREIGN KEY(id_genero)

REFERENCES tbl_genero(id)
```

Padrão:

```
fk_tabela_relacionada
```

---

# 📄 Tipos

| Tipo | Uso |
|------|-----|
|VARCHAR|Texto curto|
|TEXT|Texto grande|
|INT|Número inteiro|
|DECIMAL|Dinheiro|
|DATE|Data|
|TIME|Hora/Duração|
|BOOLEAN|0 ou 1|

---

# SQL

## INSERT

```sql
INSERT INTO tabela(campo)

VALUES(valor);
```

## SELECT

```sql
SELECT *

FROM tabela;
```

## SELECT ID

```sql
SELECT *

FROM tabela

WHERE id=1;
```

## UPDATE

```sql
UPDATE tabela

SET campo='valor'

WHERE id=1;
```

⚠ Nunca esquecer o WHERE.

## DELETE

```sql
DELETE

FROM tabela

WHERE id=1;
```

⚠ Nunca esquecer o WHERE.

## INNER JOIN

Une tabelas.

```sql
SELECT *

FROM tbl_filme

INNER JOIN tbl_genero

ON tbl_filme.id_genero = tbl_genero.id;
```

---

# Controller

## POST

- Validar Content-Type.
- validarDados().
- tratarDados().
- DAO.insert().
- Retornar 201.

---

## GET

DAO.selectAll()

↓

200 ou 404.

---

## GET ID

Validar ID.

↓

DAO.selectById()

↓

200 ou 404.

---

## PUT

Buscar ID.

↓

Validar.

↓

DAO.update().

↓

200.

---

## DELETE

Buscar ID.

↓

DAO.delete().

↓

200.

---

# validarDados()

Sempre verificar:

- undefined
- null
- ""
- isNaN()
- tamanho
- valor negativo

Se estiver errado:

400.

Se estiver certo:

```js
return false
```

---

# DAO

Normalmente possui:

```text
insert()

update()

selectAll()

selectById()

delete()
```

Só SQL.

---

# Relacionamentos

## INSERT

Cadastrar principal.

↓

Receber ID.

↓

Inserir relacionamento.

---

## UPDATE

Atualizar principal.

↓

Apagar relacionamentos.

↓

Inserir novamente.

---

# Status HTTP

|Código|Significado|
|------|-----------|
|200|OK|
|201|Criado|
|400|Erro nos dados|
|404|Não encontrado|
|415|Content-Type|
|500|Erro interno|

---

# Fluxo

```
POSTMAN

↓

ROUTE

↓

CONTROLLER

↓

DAO

↓

BANCO

↓

JSON
```

---

# Erros que mais acontecem

- Esquecer `module.exports`.
- Esquecer `require`.
- Nome da tabela errado.
- Nome do campo errado.
- Esquecer `await`.
- Esquecer `WHERE`.
- Esquecer `express.json()`.
- Não instalar dependências.
- knexConfig errado.
- Banco diferente do configurado.

---

# Ordem para fazer qualquer CRUD

## 1

Criar tabela.

## 2

Criar DAO.

## 3

Criar Controller.

## 4

Criar Routes.

## 5

Importar no app.js.

## 6

Testar no Postman.

---

# Dica da professora

Todos os CRUDs do projeto são praticamente iguais.

Se esquecer:

1. Copie um CRUD pronto.
2. Troque o nome da tabela.
3. Troque os campos.
4. Troque o SQL.
5. Ajuste a validação.

O restante normalmente permanece igual.

---

# Lembrete

Sempre pensar:

```
Quem recebe?

↓

Route

Quem pensa?

↓

Controller

Quem conversa com o banco?

↓

DAO

Quem guarda?

↓

MySQL
```

