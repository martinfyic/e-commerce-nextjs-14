# Descripción

Este es un proyecto realizado en el curso Next.js:El framework de React para producción dictado por Fernando Herrera

## Correr en dev

1. Clonar el repositorio
2. Crear una copia del archivo `.env.template` y renombrarlo a `.env`
3. Colocar las variables de entorno en el archivo `.env`
4. Instalar dependencias `npm install`
5. Levantar base de datos, ejecutar `docker compose up -d`
6. Correr las migraciones de Prisma `npx prisma migrate dev`
7. Ejecutar seed `npm run seed`
8. Ejecutar el comando `npm run dev`
9. Limpiar el `localStorage` del navegador.
