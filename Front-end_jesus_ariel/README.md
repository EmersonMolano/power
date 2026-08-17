# Biblioteca Frontend

Frontend React para la aplicacion Biblioteca.

## Que contiene

- React.
- Pantallas CRUD para `usuarios`, `libros` y `prestamos`.
- Build con `esbuild`.
- Nginx para servir el frontend en Docker.
- GitHub Action propio para validar el frontend.

## Como se conecta

El frontend no se conecta directo a PostgreSQL. El navegador llama al backend por HTTP:

```text
http://10.0.2.15:8080/api
```

La conexion esta en:

```text
src/services/api.js
```

Flujo real:

```text
Frontend React -> Backend Spring Boot -> PostgreSQL
```

## Orden correcto de ejecucion

Primero prende la base de datos:

```powershell
cd C:\Users\nruiz\Downloads\biblioteca-database-repo
docker compose up --build
```

Luego prende el backend:

```powershell
cd C:\Users\nruiz\Downloads\biblioteca-backend-repo
docker compose up --build
```

Por ultimo prende el frontend:

```powershell
cd C:\Users\nruiz\Downloads\biblioteca-frontend-repo
docker compose up --build
```

## Ejecutar sin Docker

```powershell
cd C:\Users\nruiz\Downloads\biblioteca-frontend-repo
npm install
npm start
```

## Links

Pagina web:

```text
http://10.0.2.15:3000
```

Backend que consume:

```text
http://10.0.2.15:8080/api
```

Swagger del backend:

```text
http://10.0.2.15:8080/swagger-ui/index.html
```

## Build

```powershell
npm run build
```

El resultado queda en `dist/`.
