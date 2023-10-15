# API-MOTORCYCLES

*The API IS capable of scheduling
appointments for users, and that employees can update when the motorcycles are ready for
pick them up*

## Installed libraries or tools
##### NOTA: *Before running the tools and libraries, clone the project that is in the following path ---> https://github.com/castilloxavie/appi-motorcycles, keep in mind to clone the env.temolate file and rename it .env and add the variables of environment*

```sh
npm init -y
npm i express
npm i -D nodemon
docker-compose up -d
npm i env-var
npm i dotenv
npm i sequelize
npm i pg pg-hstore
npm i zod
npm i morgan
npm i cors
npm i bcrypt
npm i jsonwebtoken
npm i perfect-express-sanitizer
npm i hpp
npm i helmet
npm i express-rate-limit
npm run dev
```







###  Endpoints Users and Repairs
#### Users
|  HTTP  |           URL                  |         Description    |
|--------|--------------------------------|------------------------|
|GET     |http://localhost:3002/api/v1/users/ | returns all users  |
|GET     |http://localhost:3002/api/v1/users/id | returns a single user by id |
|POST    |http://localhost:3002/api/v1/users/login | user login      |
|POST    |http://localhost:3002/api/v1/users/register | user register |
|PATCH   |http://localhost:3002/api/v1/users/id | update user      |
|DELETE  |http://localhost:3002/api/v1/users/id | they are not deleted, they change from true to false |

#### Repairs
|  HTTP  |           URL                  |         Description    |
|--------|--------------------------------|------------------------|
|GET     |http://localhost:3002/api/v1/repairs/ | returns all repairs  |
|GET     |http://localhost:3002/api/v1/repairs/id | returns a single repair by id |
|POST    |http://localhost:3002/api/v1/repairs/ | create a repair      |
|PATCH   |http://localhost:3002/api/v1/repairs/id | update repair      |
|DELETE  |http://localhost:3002/api/v1/repairs/id | they are not deleted, they change from true to false |
