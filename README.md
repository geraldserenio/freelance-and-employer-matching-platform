# Pre-requisites

1. Node

2. Docker

# How to run

1. Go to root folder

2. Run this command "docker-compose up -d"

3. You can now access the environment


# How to access environment

1. FE - localhost:3000

2. BE - localhost:5000


# Migration

1. npx sequelize-cli db:migrate - migrate all tables
2. npx sequelize-cli db:seed:all - store temporary data to tables

   npx sequelize-cli db:migrate:undo:all - when you want to clear all database tables for new migration - optional and this should be performed in local or development environment only

# Check database and tables

1. open your postgres terminal and run this command "docker exec -it postgres psql -U username -d database"

2. you should be inside the database psql
