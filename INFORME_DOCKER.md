# Informe tecnico: despliegue de aplicacion multicapa con Docker en Linux

## 1. Datos generales

**Proyecto:** Sistema Biblioteca
**Tipo de aplicacion:** Aplicacion multicapa dockerizada
**Componentes:** Frontend, backend y base de datos
**Entorno de despliegue:** Maquina virtual Linux con Docker

## 2. Objetivo

Implementar y desplegar una aplicacion multicapa dentro de una maquina virtual Linux, utilizando Docker como plataforma de contenedores. La solucion permite administrar informacion de una biblioteca mediante una interfaz web, una API REST y una base de datos PostgreSQL.

## Guia general de orden

Este informe sigue el orden de actividades indicado en el archivo `message.txt`. El orden general es:

```text
1. Definir arquitectura y tecnologias.
2. Preparar la maquina virtual Linux.
3. Instalar Docker.
4. Probar contenedores, administracion, Portainer y volumenes.
5. Crear Dockerfile del frontend.
6. Crear Dockerfile del backend.
7. Desplegar la base de datos.
8. Probar comunicacion backend-base de datos.
9. Probar comunicacion frontend-backend.
10. Integrar la aplicacion.
11. Levantar todo con Docker Compose.
12. Probar recuperacion, intranet y documentacion final.
```

El comando `docker compose up -d --build` se ejecuta en la actividad de Docker Compose, despues de instalar Docker y despues de tener Dockerfile, backend, frontend y base de datos definidos.

## 3. Arquitectura de la solucion

La aplicacion esta dividida en tres capas:

```text
Equipo cliente
    |
    | HTTP
    v
Frontend React
    |
    | HTTP / REST
    v
Backend Spring Boot
    |
    | JDBC / SQL
    v
PostgreSQL
```

Flujo completo:

```text
Frontend React -> Backend Spring Boot -> PostgreSQL
```

## 4. Actividad 1 - Seleccion de la arquitectura tecnologica

| Componente    | Tecnologia            |                       Puerto | Funcion                                  |
| ------------- | --------------------- | ---------------------------: | ---------------------------------------- |
| Frontend      | React + Nginx         |                         3000 | Interfaz de usuario                      |
| Backend       | Java 17 + Spring Boot |                         8080 | API REST                                 |
| Base de datos | PostgreSQL 16         | 25433 externo / 5432 interno | Persistencia                             |
| Migraciones   | Liquibase             |                    No aplica | Creacion de estructura y datos iniciales |
| Comunicacion  | HTTP REST y JDBC      |                  8080 / 5432 | Integracion entre capas                  |

### Justificacion

React permite construir una interfaz dinamica para realizar operaciones CRUD sobre usuarios, libros y prestamos. Spring Boot facilita la creacion de una API REST robusta con validaciones, servicios, controladores y conexion a base de datos mediante JPA. PostgreSQL es un motor relacional estable y compatible con Docker. Liquibase permite versionar la estructura de la base de datos y ejecutar migraciones de forma ordenada.

## 5. Estructura del proyecto

```text
power/
  Front-end_jesus_ariel/
    Dockerfile
    docker-compose.yml
    nginx.conf
    package.json
    src/

  backend_jesus_ariel/
    Dockerfile
    docker-compose.yml
    pom.xml
    src/

  Databases_jesus_ariel/
    docker-compose.yml
    changelog-master.yaml
    liquibase.properties
    01_ddl/
    02_dml/
    03_dcl/
    04_tcl/
    05_rollbacks/
```

## 6. Actividad 2 - Preparacion de la maquina virtual Linux

Comandos utilizados para verificar el servidor:

```bash
hostname
hostnamectl
uname -a
free -h
df -h
```

Comandos para verificar la red:

```bash
ip addr
ip route
ping 8.8.8.8
```

**Evidencias:**

- Captura 2: informacion del servidor Linux.

![](/mv_img/1uno.PNG)
![](/mv_img/2uno.PNG)
![](/mv_img/3uno.PNG)

- Captura 3: direccion IP de la maquina virtual.
![](/mv_img/4dos.PNG)

## 7. Actividad 3 - Instalacion y configuracion de Docker

Antes de ejecutar la aplicacion se debe instalar Docker en la maquina virtual. Los siguientes comandos se ejecutan en Ubuntu Server.

Actualizar paquetes:

```bash
sudo apt update
```
![](/mv_img/5tres.PNG)
```
sudo apt upgrade -y
```
![](/mv_img/6tres.PNG)

Instalar dependencias:

```bash
sudo apt install -y ca-certificates curl
```
![](/mv_img/7tres.PNG)

Agregar la llave oficial de Docker:

```bash
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```
![](/mv_img/8cuatro.PNG)

Agregar el repositorio oficial:

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo ${UBUNTU_CODENAME:-$VERSION_CODENAME}) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
![](/mv_img/9cuatro.PNG)

Instalar Docker y Docker Compose:

```bash
sudo apt update
sudo snap install docker
```
![](/mv_img/10cinco.PNG)
![](/mv_img/11cinco.PNG)

Activar Docker:

```bash
sudo snap start docker
sudo snap enable docker //Habilita para que docker inicie de manera automatica
```
![](/mv_img/12cinco.PNG)

Comandos de verificacion:

```bash
docker --version
docker compose version
sudo snap services docker
```

![](/mv_img/13cinco.PNG)

Prueba de Docker:

```bash
sudo docker run hello-world
```

**Evidencia:**

- Captura 4: Docker funcionando correctamente.

![](/mv_img/14cinco.PNG)

## 8. Actividad 4 - Primer contenedor

Prueba inicial:

```bash
sudo docker run hello-world
```
![](/mv_img/14cinco.PNG)

Servidor web de prueba:

```bash
sudo docker run -d --name nginx-prueba -p 8080:80 nginx
sudo docker ps
```

**Evidencias:**

- Captura 5: primer contenedor ejecutado.

![](/mv_img/15seis.PNG)

- Captura 6: servicio web funcionando.

![](/mv_img/16seis.PNG)

## 9. Actividad 5 - Administracion de contenedores

Comandos usados:

```bash
sudo docker ps
sudo docker ps -a
```
![](/mv_img/17.PNG)
```bash
sudo docker stop nginx-prueba //Tambien se puede usar el id del contenedor.
```
![](/mv_img/18.PNG)
```bash
sudo docker start nginx-prueba
sudo docker restart nginx-prueba
```
![](/mv_img/19.PNG)
```bash
sudo docker logs nginx-prueba
```
![](/mv_img/20.PNG)
```bash
sudo docker inspect nginx-prueba
```
![](/mv_img/21.PNG)
```bash
sudo docker rm nginx-prueba
```
![](/mv_img/22.PNG)

**Evidencia:**

- Captura 7: administracion de contenedores.

## 10. Actividad 6 - Instalacion de Portainer

Comandos:

```bash
sudo docker volume create portainer_data
```
![](/mv_img/23.PNG)
```bash
sudo docker run -d \
  --name portainer \
  -p 9443:9443 \
  -p 9000:9000 \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce
```
![](/mv_img/24.PNG)

Acceso:

```text
https://192.168.0.17:9443
```

### Configuracion inicial de Portainer

1. Abrir en el navegador:

```text
https://192.168.0.17:9443
```

2. Crear el usuario administrador y su respectivo token que se encuentra en "sudo docker logs portainer" y se encuentra en "setup_token=".

3. Seleccionar el entorno local de Docker.

4. Entrar a:

```text
Home -> local
```

5. Verificar las secciones:

```text
Containers
Images
Networks
Volumes
Stacks
```

### Levantar la aplicacion desde Portainer usando Stack

Portainer permite ejecutar el archivo `docker-compose.yml` desde la interfaz grafica mediante la opcion **Stacks**.

Pasos:

1. Entrar a:

```text
local -> Stacks
```

2. Seleccionar:

```text
Add stack
```

3. Nombre del stack:

```text
biblioteca
```

4. En el editor web, pegar el contenido del archivo `docker-compose.yml` principal.

5. Presionar:

```text
Deploy the stack
```

6. Verificar en Portainer:

```text
Containers -> biblioteca_database_postgres
Containers -> biblioteca_database_liquibase
Containers -> biblioteca_backend_api
Containers -> biblioteca_frontend_app
```

7. Verificar que se hayan creado:

```text
Networks -> biblioteca_net
Volumes -> postgres_data
```

8. Abrir la aplicacion:

```text
http://192.168.0.17:3000
```

Nota: si se despliega desde Portainer con Stack, se esta haciendo lo mismo que con este comando:

```bash
sudo docker compose up -d --build
```

**Evidencias:**

- Captura 8: Portainer funcionando.

![](/mv_img/25.PNG)

- Captura 9: administracion del entorno Docker desde Portainer.

![](/mv_img/26.PNG)

## 11. Actividad 7 - Volumenes Docker

Creacion de volumen:

```bash
sudo docker volume create datos_aplicacion
sudo docker volume ls
```

Para la base de datos se recomienda usar un volumen persistente:

```text
postgres_data:/var/lib/postgresql/data
```

Esto permite conservar los datos aunque el contenedor se detenga o se vuelva a crear.

**Evidencias:**

- Captura 10: volumen creado.

![](/mv_img/27.PNG)
![](/mv_img/28.PNG)

- Captura 11: prueba de persistencia.

Aqui lo que se esta haciendo es crear un contenedor de postgres con nombre de postgres_test aunque lo importante es el apartado de -v datos_aplicacion:/##### ya que le estamos diciendo que se guarde en y ya en caso de ser borrado el contenedor se puede recuperrar simplemente creandolo de nuevo, ya que al ser persistente se mantienen los datos incluso despues de ser borrados.

![](/mv_img/29.PNG)

## 12. Actividad 8 - Dockerfile del frontend

Archivo: `Front-end_jesus_ariel/Dockerfile`

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/
EXPOSE 80
```

Construccion:

```bash
cd Front-end_jesus_ariel
docker compose up --build
```

Acceso:

```text
http://192.168.0.17:3000
```

**Evidencias:**

- Captura 12: Dockerfile del frontend.

![](/mv_img/30.PNG)

- Captura 13: imagen Docker construida.

a![](/mv_img/32.PNG)

- Captura 14: frontend funcionando dentro del contenedor.

## 13. Actividad 9 - Dockerfile del backend

Archivo: `backend_jesus_ariel/Dockerfile`

```dockerfile
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -B dependency:go-offline
COPY src ./src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Construccion:

```bash
cd backend_jesus_ariel
docker compose up --build
```

Acceso:

```text
http://192.168.0.17:8080/api
http://192.168.0.17:8080/swagger-ui/index.html
```

**Evidencias:**

- Captura 15: Dockerfile del backend.

![](/mv_img/31.PNG)

- Captura 16: imagen del backend.
- Captura 17: backend funcionando.

## 14. Actividad 10 - Despliegue de la base de datos

La base de datos utiliza PostgreSQL 16 y Liquibase para crear tablas, indices y datos iniciales.

Credenciales:

```text
POSTGRES_DB=biblioteca
POSTGRES_USER=biblioteca_user
POSTGRES_PASSWORD=biblioteca_pass
```

Comando:

```bash
cd Databases_jesus_ariel
docker compose up --build
```

Puerto publicado:

```text
192.168.0.17:25433
```

**Evidencias:**

- Captura 18: contenedor de base de datos funcionando.
- Captura 19: base de datos creada.
- Captura 20: volumen asociado a la base de datos.

## 15. Actividad 11 - Comunicacion backend-base de datos

El backend se conecta a PostgreSQL mediante JDBC.

Variables principales:

```text
SERVER_PORT=8080
SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal:25433/biblioteca
SPRING_DATASOURCE_USERNAME=biblioteca_user
SPRING_DATASOURCE_PASSWORD=biblioteca_pass
```

Endpoints principales:

```text
GET    /api/usuarios
POST   /api/usuarios
PUT    /api/usuarios/{id}
DELETE /api/usuarios/{id}

GET    /api/libros
POST   /api/libros
PUT    /api/libros/{id}
DELETE /api/libros/{id}

GET    /api/prestamos
POST   /api/prestamos
PUT    /api/prestamos/{id}
DELETE /api/prestamos/{id}
```

Prueba de lectura:

```bash
curl http://192.168.0.17:8080/api/usuarios
```

Prueba de escritura:

```bash
curl -X POST http://192.168.0.17:8080/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Usuario prueba","email":"usuario.prueba@example.com"}'
```

**Evidencias:**

- Captura 21: configuracion de conexion.
- Captura 22: operacion de lectura.
- Captura 23: operacion de escritura.
- Captura 24: logs mostrando comunicacion exitosa.

## 16. Actividad 12 - Comunicacion frontend-backend

El frontend consume el backend desde:

```text
http://192.168.0.17:8080/api
```

La configuracion se encuentra en:

```text
Front-end_jesus_ariel/src/services/api.js
```

Nota: El archivo `Front-end_jesus_ariel/nginx.conf` incluye una regla para proxear las solicitudes que empiezan por `/api/` al servicio `backend:8080` dentro de la red Docker. Esto evita problemas de CORS y permite que el frontend use la misma host/IP del navegador sin cambiar el código del cliente.


La interfaz permite consultar, registrar, actualizar y eliminar informacion de usuarios, libros y prestamos.

**Evidencias:**

- Captura 25: frontend funcionando.
- Captura 26: solicitud del frontend hacia el backend.
- Captura 27: respuesta recibida desde el backend.

## 17. Actividad 13 - Integracion de la aplicacion

En esta actividad se comprueba que los tres componentes trabajan como un solo sistema:

```text
Frontend React
    |
    | HTTP
    v
Backend Spring Boot
    |
    | JDBC
    v
PostgreSQL
```

La integracion se valida cuando:

- El frontend carga correctamente.
- El frontend consume endpoints del backend.
- El backend responde solicitudes HTTP.
- El backend lee y escribe datos en PostgreSQL.
- Los datos quedan almacenados en la base de datos.

Servicios esperados en la maquina virtual:

| Servicio   | URL                                             |
| ---------- | ----------------------------------------------- |
| Frontend   | `http://192.168.0.17:3000` |
| Backend    | `http://192.168.0.17:8080/api` |
| Swagger    | `http://192.168.0.17:8080/swagger-ui/index.html` |
| PostgreSQL | `192.168.0.17:25433` |

**Evidencia:**

- Captura 28: aplicacion completa funcionando.

## 18. Actividad 14 - Docker Compose

Archivo principal: `docker-compose.yml`

Esta es la actividad donde se ejecuta el despliegue completo en la maquina virtual. El comando se debe ejecutar desde la raiz del proyecto, no desde la carpeta del frontend.

Estructura esperada:

```text
power/
  docker-compose.yml
  INFORME_DOCKER.md
  Front-end_jesus_ariel/
  backend_jesus_ariel/
  Databases_jesus_ariel/
```

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: postgres
    environment:
      POSTGRES_DB: biblioteca
      POSTGRES_USER: biblioteca_user
      POSTGRES_PASSWORD: biblioteca_pass
    ports:
      - "25433:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - biblioteca_net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U biblioteca_user -d biblioteca"]
      interval: 10s
      timeout: 5s
      retries: 5

  liquibase:
    image: liquibase/liquibase:4.29
    container_name: liquibase_liquibase
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./Databases_jesus_ariel:/liquibase/changelog
    working_dir: /liquibase/changelog
    command: --defaults-file=liquibase.properties update
    networks:
      - biblioteca_net

  backend:
    build:
      context: ./backend_jesus_ariel
    container_name: backend
    depends_on:
      postgres:
        condition: service_healthy
      liquibase:
        condition: service_completed_successfully
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/biblioteca
      SPRING_DATASOURCE_USERNAME: biblioteca_user
      SPRING_DATASOURCE_PASSWORD: biblioteca_pass
      SERVER_PORT: 8080
    ports:
      - "8080:8080"
    networks:
      - biblioteca_net

  frontend:
    build:
      context: ./Front-end_jesus_ariel
    container_name: frontend
    depends_on:
      - backend
    ports:
      - "3000:80"
    networks:
      - biblioteca_net

networks:
  biblioteca_net:

volumes:
  postgres_data:
```

Comandos:

```bash
cd power
docker compose up -d --build
docker compose ps
```

Tambien se puede desplegar desde Portainer:

```text
Portainer -> local -> Stacks -> Add stack -> pegar docker-compose.yml -> Deploy the stack
```

Resultado esperado:

```text
biblioteca_database_postgres    running / healthy
biblioteca_database_liquibase   exited 0
biblioteca_backend_api          running
biblioteca_frontend_app         running
```

Nota: Liquibase puede aparecer como `exited 0`. Eso es correcto, porque ejecuta las migraciones y termina.

No se debe ejecutar solamente:

```bash
cd Front-end_jesus_ariel
docker compose up --build
```

Ese comando solo prende el frontend. Para que funcione la aplicacion completa en la maquina virtual, se debe usar el `docker-compose.yml` principal ubicado en la raiz `power`.

**Evidencias:**

- Captura 29: archivo Docker Compose.
- Captura 30: todos los servicios funcionando.

## 19. Actividad 15 - Prueba de recuperacion

Detener:

```bash
docker compose stop
docker compose ps
```

Iniciar:

```bash
docker compose start
docker compose ps
```

Recrear:

```bash
docker compose down
docker compose up -d
```

Reconstruir:

```bash
docker compose up -d --build
```

**Evidencias:**

- Captura 31: servicios detenidos.
- Captura 32: servicios recuperados.
- Captura 33: servicios reconstruidos.

## 20. Actividad 16 - Comprobacion desde la intranet

Obtener la IP de la maquina virtual:

```bash
ip addr
```

Desde el equipo anfitrion o desde otro equipo de la red:

```text
http://IP_MAQUINA_VIRTUAL:3000
```

**Evidencias:**

- Captura 34: aplicacion funcionando desde el equipo anfitrion.
- Captura 35: aplicacion funcionando desde otro equipo de la intranet.

## 21. Actividad 17 - Documentacion de la solucion

### Red Docker

```text
biblioteca_net
```

Permite la comunicacion interna entre frontend, backend, PostgreSQL y Liquibase.

### Volumenes

```text
postgres_data
portainer_data
datos_aplicacion
```

El volumen mas importante para la aplicacion es `postgres_data`, porque guarda los datos de PostgreSQL.

### Variables de entorno

```text
POSTGRES_DB=biblioteca
POSTGRES_USER=biblioteca_user
POSTGRES_PASSWORD=biblioteca_pass
SERVER_PORT=8080
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/biblioteca
SPRING_DATASOURCE_USERNAME=biblioteca_user
SPRING_DATASOURCE_PASSWORD=biblioteca_pass
```

## 22. Problemas encontrados y soluciones

| Problema                                                                                | Solucion                                                               |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| El backend no debe conectarse directamente a la IP del host cuando esta dentro de Docker. | En Docker Compose integrado se usa el nombre del servicio `postgres`. |
| Los datos se pueden perder si no existe volumen.                                        | Se define el volumen`postgres_data`.                                 |
| La base debe estar lista antes del backend.                                             | Se usa`healthcheck` en PostgreSQL y `depends_on`.                  |
| Las tablas deben existir antes de usar la API.                                          | Se ejecuta Liquibase antes del backend.                                |
| El frontend necesita conocer la URL del backend.                                        | Se puede configurar `http://192.168.0.17:8080/api` en `src/services/api.js` o usar la variable de navegador `window.BIBLIOTECA_API_URL`/localStorage para apuntar a `http://192.168.0.17:8080/api`.  |

## 23. Evidencias de aprendizaje

| N. | Evidencia             | Resultado esperado               |
| -: | --------------------- | -------------------------------- |
|  1 | Seleccion tecnologica | Arquitectura definida            |
|  2 | Maquina virtual       | Linux funcionando                |
|  3 | Red virtual           | IP y conectividad                |
|  4 | Docker                | Servicio operativo               |
|  5 | Primer contenedor     | Contenedor funcionando           |
|  6 | Administracion        | Operaciones Docker realizadas    |
|  7 | Portainer             | Gestion grafica disponible       |
|  8 | Volumenes             | Persistencia comprobada          |
|  9 | Dockerfile frontend   | Imagen y contenedor frontend     |
| 10 | Dockerfile backend    | Imagen y contenedor backend      |
| 11 | Base de datos         | PostgreSQL funcionando           |
| 12 | Backend-BD            | Comunicacion exitosa             |
| 13 | Frontend-Backend      | API consumida desde frontend     |
| 14 | Integracion           | Aplicacion multicapa funcionando |
| 15 | Docker Compose        | Servicios integrados             |
| 16 | Recuperacion          | Servicios restaurados            |
| 17 | Intranet              | Acceso desde otros equipos       |
| 18 | Documentacion         | Informe tecnico completo         |

## 24. Resultado final

La aplicacion Biblioteca queda compuesta por un frontend React servido con Nginx, un backend Spring Boot con API REST y una base de datos PostgreSQL administrada con Liquibase. La solucion cumple con los requisitos de dockerizacion, comunicacion entre capas, persistencia mediante volumenes, uso de variables de entorno, administracion de contenedores y despliegue sobre una maquina virtual Linux.
