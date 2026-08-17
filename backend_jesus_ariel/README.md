# Biblioteca Backend

Backend Spring Boot para la aplicacion Biblioteca.

## Que contiene

- API REST para `usuarios`, `libros` y `prestamos`.
- Spring Boot, Spring Web, Spring Data JPA, Validation y Lombok.
- Swagger/OpenAPI con Springdoc.
- Dockerfile para construir la API.
- GitHub Action propio para validar el backend.

## Como se conecta

Este backend no crea la base de datos. Se conecta a la base que corre desde el repositorio `biblioteca-database-repo`.

Cuando corres el backend con Docker, usa esta URL interna:

```text
jdbc:postgresql://10.0.2.15:25433/biblioteca
```

Eso significa:

- `host.docker.internal`: desde el contenedor del backend apunta a tu computador.
- `25433`: puerto donde el repo de base de datos publica PostgreSQL.
- `biblioteca`: nombre de la base de datos.

## Orden correcto de ejecucion

Primero prende la base de datos:

```powershell
cd C:\Users\nruiz\Downloads\biblioteca-database-repo
docker compose up --build
```

Luego prende el backend en otra terminal:

```powershell
cd C:\Users\nruiz\Downloads\biblioteca-backend-repo
docker compose up --build
```

Despues puedes prender el frontend desde su carpeta.

## Ejecutar sin Docker

Si quieres correr el backend directo con Maven, tambien funciona mientras la base este prendida:

```powershell
cd C:\Users\nruiz\Downloads\biblioteca-backend-repo
mvn spring-boot:run
```

Para Maven local se usa la URL de `application.yml`:

```text
jdbc:postgresql://10.0.2.15:25433/biblioteca
```

## Links

Swagger:

```text
http://10.0.2.15:8080/swagger-ui/index.html
```

API:

```text
http://10.0.2.15:8080/api
```

## Variables principales

```text
SERVER_PORT=8080
SPRING_DATASOURCE_URL=jdbc:postgresql://10.0.2.15:25433/biblioteca
SPRING_DATASOURCE_USERNAME=biblioteca_user
SPRING_DATASOURCE_PASSWORD=biblioteca_pass
```
