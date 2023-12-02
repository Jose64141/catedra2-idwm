# Práctica 2

Este proyecto tiene las siguientes dependencias:
* Node.js 18 LTS
* MySQL 8

Este projecto consta de dos componentes principales:

## Backend
El servidor de backend corre encima de Node.js y utiliza Apollo Server como framework para manejo de peticiones.
Este se encuentra en la carpeta `backend`.
En primera instancia, se deben instalar las dependencias de este componente, mediante el comando:

`` npm install ``

Para establecer la conexión con la base de datos, se debe crear un archivo `.env` en la carpeta `backend` que contenga el URL de conexión a esta. 
Se mantiene un ejemplo de este archivo que contiene la estructura que debe tener el archivo `.env`.
De la variable de entorno `DATABASE_URL`, se debe reemplazar el usuario, contraseña, host y puerto de la base de datos.

Luego, se deben generar las migraciones en la base de datos. Para esto, se debe ejecutar el siguiente comando en la carpeta `backend`:

```
 npx prisma migrate dev
 npx prisma db seed   
```

Para correr el servidor, se debe ejecutar el siguiente comando en la carpeta `backend`:

`` npm run dev ``

## Frontend
El servidor de frontend corre encima de Node.js y utiliza la librería React.
Este se encuentra en la carpeta `frontend`.
En primera instancia, se deben instalar las dependencias de este componente, mediante el comando:

`` npm install ``

Para correr el servidor, se debe ejecutar el siguiente comando en la carpeta `frontend`:

`` npm start ``

### `npm start`

Se ejecutará en [http://localhost:3000/portfolio](http://localhost:3000/portfolio).
