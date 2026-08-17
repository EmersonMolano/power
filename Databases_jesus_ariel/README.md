# Biblioteca Database

Repositorio separado para PostgreSQL y Liquibase de la aplicacion Biblioteca.

## Que contiene

- Docker Compose para levantar PostgreSQL.
- Liquibase para crear tablas, indices y datos iniciales.
- Estructura recomendada de migraciones por carpetas.
- GitHub Action propio para validar migraciones.

## Como se conecta con los otros repositorios

Este repositorio se prende primero y publica PostgreSQL en tu computador:

```text
10.0.2.15:25433
```

El backend se conecta a esa base de datos. El frontend no toca la base directamente.

Flujo completo:

```text
biblioteca-database-repo  -> PostgreSQL en 10.0.2.15:25433
biblioteca-backend-repo   -> API en 10.0.2.15:8080, conectada a PostgreSQL
biblioteca-frontend-repo  -> Web en 10.0.2.15:3000, conectada al backend
```

## Orden correcto de ejecucion

Terminal 1, base de datos:

```powershell
cd C:\Users\nruiz\Downloads\biblioteca-database-repo
docker compose up --build
```

Terminal 2, backend:

```powershell
cd C:\Users\nruiz\Downloads\biblioteca-backend-repo
docker compose up --build
```

Terminal 3, frontend:

```powershell
cd C:\Users\nruiz\Downloads\biblioteca-frontend-repo
docker compose up --build
```

## Puertos

```text
PostgreSQL:  10.0.2.15:25433
Backend:     http://10.0.2.15:8080
Swagger:     http://10.0.2.15:8080/swagger-ui/index.html
Frontend:    http://10.0.2.15:3000
```

## Credenciales

```text
POSTGRES_DB=biblioteca
POSTGRES_USER=biblioteca_user
POSTGRES_PASSWORD=biblioteca_pass
```

## Estructura

```text
01_ddl/
  00_extensions/
  01_schemas/
  02_types/
  03_tables/
  04_views/
  05_materialized_views/
  06_functions/
  07_procedures/
  08_triggers/
  09_indexes/
02_dml/
  00_inserts/
  01_updates/
  02_deletes/
  03_upserts/
  04_patches/
03_dcl/
04_tcl/
05_rollbacks/
docker/
docs/
scripts/
changelog-master.yaml
docker-compose.yml
liquibase.properties
liquibase.properties.example
```

## Orden de Liquibase

Liquibase lee `changelog-master.yaml` y desde ahi llama los changelogs internos:

```text
changelog-master.yaml
  -> 01_ddl/changelog.yaml
  -> 02_dml/changelog.yaml
  -> 03_dcl/changelog.yaml
  -> 04_tcl/changelog.yaml
```

En este proyecto actualmente crea primero la estructura, despues los indices y despues los datos iniciales.
