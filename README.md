# About

Simple api app created with node.js, express and typescript. Used database mysql (package mysql2). For testing postman is recommended.

Port for server is 3000 unless provided by system

## Installation

depending on your package manager

> pnpm install / yarn / npm install

## How to start

> pnpm dev

or

> yarn dev

or

> npm run dev

## API

### **Creating user**

POST /api/user

_query parameters_

| Query     | Type |      Description       | Required? |
| :-------- | :--- | :--------------------: | :-------: |
| firstName | text | first name of the user |           |
| lastName  | text | last name of the user  |           |
| email     | text |       user email       |    yes    |
| role      | text |    role of the user    |    yes    |

example

> localhost:port/api/user?firstName=John&lastName=Smith&email=johnsmith@example.com&role=admin

---

### **Getting all users**

GET /api/users

example

> localhost:port/api/users

---

### **Getting all users according to role**

GET /api/users

_query parameters_

| Query | Type |   Description    |
| :---- | :--- | :--------------: |
| role  | text | role of the user |

example

> localhost:port/api/users?role=user

---

### **Getting one user**

GET /api/user/:id

_path parameters_

| Path | Type   |  Description   |
| :--- | :----- | :------------: |
| id   | number | id of the user |

example

> localhost:port/api/user/3

---

### **Updating a user**

PATCH /api/user/:id

_path parameters_

| Path | Type   |  Description   |
| :--- | :----- | :------------: |
| id   | number | id of the user |

_query parameters_

| Query     | Type |      Description       |
| :-------- | :--- | :--------------------: |
| firstName | text | first name of the user |
| lastName  | text | last name of the user  |
| role      | text |    role of the user    |

example

> localhost:port/api/user/3?firstName=Tom&lastName=Mark&role=user

---

### **Deleting a user**

DELETE /api/user/:id

path parameters

| Path | Type   |  Description   |
| :--- | :----- | :------------: |
| id   | number | id of the user |

example

> localhost:port/api/user/3
