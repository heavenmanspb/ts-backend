# ts-backend
Nodejs typescript fastify knex example

## Установка
1. установите зависимости ```npm ci```
2. настройте переменные окружения см. ***.env.sample***
3. выполните миграцию базы данных (см.ниже)

## Запуск
- ```npm run db:migrate:up``` - создание базы и установка миграций
- ```npm run build``` - сборка проекта в папку dist
- ```npm run start``` - запуск в режиме продакшен
- ```npm run dev``` - запуск в режиме разработки.
- ```npm run dev:nodemon``` - запуск в режиме разработки c nodemon

## Запуск в докере
- ```cp .env.sample .env```
- Отредактировать .env
- docker-compose up --build -d ts-backend

## Swagger
- ```/docs``` - доступен при запуске с NODE_ENV: dev
