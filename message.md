# ACTIVIDAD DE APRENDIZAJE

## Despliegue de una aplicación multicapa en Docker sobre Linux

### 1. Objetivo

Implementar y desplegar una aplicación multicapa dentro de una máquina virtual con Linux, utilizando Docker como plataforma de contenedores.

El aprendiz podrá seleccionar libremente las tecnologías y lenguajes para desarrollar el **frontend, backend y base de datos**, siempre que los componentes sean compatibles, puedan ejecutarse mediante Docker y funcionen correctamente de manera integrada.

---

# 2. Arquitectura de la solución

La solución deberá estar compuesta como mínimo por tres componentes:

```text
                 EQUIPO CLIENTE
                       │
                       │ HTTP
                       ▼
              ┌─────────────────┐
              │     FRONTEND    │
              │                 │
              │ Framework libre │
              └────────┬────────┘
                       │
                       │ HTTP / REST / API
                       ▼
              ┌─────────────────┐
              │     BACKEND     │
              │                 │
              │ Lenguaje libre  │
              └────────┬────────┘
                       │
                       │ SQL / NoSQL
                       ▼
              ┌─────────────────┐
              │   BASE DATOS    │
              │                 │
              │ Motor libre     │
              └─────────────────┘

                 RED DOCKER
                       │
              ┌────────▼────────┐
              │  UBUNTU SERVER  │
              │ MÁQUINA VIRTUAL │
              └─────────────────┘
```

---

# 3. Selección tecnológica

El aprendiz podrá seleccionar las tecnologías que considere apropiadas.

### Frontend

Ejemplos:

* React.
* Angular.
* Vue.
* Svelte.
* Next.js.
* Nuxt.
* HTML/CSS/JavaScript.
* Otro framework compatible.

### Backend

Ejemplos:

* Java / Spring Boot.
* JavaScript / Node.js / Express.
* TypeScript / NestJS.
* Python / Django.
* Python / FastAPI.
* Python / Flask.
* PHP / Laravel.
* C# / ASP.NET Core.
* Go.
* Ruby on Rails.
* Otro framework compatible.

### Base de datos

Ejemplos:

* MySQL.
* MariaDB.
* PostgreSQL.
* MongoDB.
* SQL Server.
* SQLite, cuando técnicamente sea apropiado para el proyecto.
* Otro sistema de almacenamiento compatible.

**Nota:** La selección tecnológica deberá estar justificada por el aprendiz.

---

# 4. Actividad 1 — Selección de la arquitectura tecnológica

Antes de comenzar el despliegue, seleccionar:

* Framework frontend.
* Lenguaje y framework backend.
* Sistema gestor de base de datos.
* Tecnología utilizada para la comunicación.
* Puerto de cada servicio.

El aprendiz deberá elaborar una tabla similar a:

| Componente    | Tecnología       | Puerto | Función            |
| ------------- | ----------------- | -----: | ------------------- |
| Frontend      | React             |   3000 | Interfaz de usuario |
| Backend       | Node.js + Express |   8080 | API REST            |
| Base de datos | PostgreSQL        |   5432 | Persistencia        |

Los valores anteriores son solamente un ejemplo.

### Evidencia

**Captura 1:** Tabla o documento con la arquitectura tecnológica seleccionada.

---

# 5. Actividad 2 — Preparación de la máquina virtual Linux

Configurar la máquina virtual que funcionará como servidor.

Verificar:

```bash
hostname
hostnamectl
uname -a
free -h
df -h
```

Verificar la red:

```bash
ip addr
ip route
```

Comprobar conectividad:

```bash
ping 8.8.8.8
```

### Evidencia

**Captura 2:** Información del servidor Linux.

**Captura 3:** Dirección IP de la máquina virtual.

---

# 6. Actividad 3 — Instalación y configuración de Docker

Instalar y configurar Docker dentro de la máquina virtual.

Verificar:

```bash
docker --version
docker compose version
```

Comprobar el servicio:

```bash
sudo systemctl status docker
```

### Evidencia

**Captura 4:** Docker funcionando correctamente.

---

# 7. Actividad 4 — Primer contenedor

Ejecutar un contenedor de prueba:

```bash
docker run hello-world
```

Posteriormente ejecutar un servidor web:

```bash
docker run -d \
  --name nginx-prueba \
  -p 8080:80 \
  nginx
```

Comprobar:

```bash
docker ps
```

### Evidencia

**Captura 5:** Primer contenedor ejecutado.

**Captura 6:** Servicio web funcionando.

---

# 8. Actividad 5 — Administración de contenedores

Realizar operaciones de:

```bash
docker ps
docker ps -a
docker stop
docker start
docker restart
docker logs
docker inspect
docker rm
```

### Evidencia

**Captura 7:** Administración de los contenedores.

---

# 9. Actividad 6 — Instalación de Portainer

Instalar Portainer utilizando Docker.

El aprendiz deberá demostrar:

* Creación del volumen.
* Creación del contenedor.
* Acceso a Portainer.
* Visualización de contenedores.
* Visualización de imágenes.
* Visualización de redes.
* Visualización de volúmenes.

### Evidencia

**Captura 8:** Portainer funcionando.

**Captura 9:** Administración del entorno Docker desde Portainer.

---

# 10. Actividad 7 — Volúmenes Docker

Crear y utilizar volúmenes Docker.

```bash
docker volume create datos_aplicacion
```

Comprobar:

```bash
docker volume ls
```

El volumen deberá utilizarse para almacenar información que deba sobrevivir al ciclo de vida del contenedor.

### Evidencia

**Captura 10:** Volumen creado.

**Captura 11:** Prueba de persistencia.

---

# 11. Actividad 8 — Dockerfile del frontend

Crear un Dockerfile para el frontend seleccionado.

El Dockerfile deberá permitir:

1. Obtener la imagen base.
2. Instalar dependencias.
3. Copiar el código.
4. Construir la aplicación, cuando corresponda.
5. Ejecutar el servicio.
6. Exponer el puerto correspondiente.

Ejemplo conceptual:

```text
Código fuente
      │
      ▼
 Dockerfile
      │
      ▼
 Imagen Docker
      │
      ▼
 Contenedor Frontend
```

### Evidencia

**Captura 12:** Dockerfile del frontend.

**Captura 13:** Imagen Docker construida.

**Captura 14:** Frontend funcionando dentro del contenedor.

---

# 12. Actividad 9 — Dockerfile del backend

Crear un Dockerfile para el backend.

El contenedor deberá:

* Ejecutar el backend.
* Exponer el puerto correspondiente.
* Permitir recibir solicitudes del frontend.
* Permitir comunicarse con la base de datos.
* Utilizar variables de entorno para la configuración.

### Evidencia

**Captura 15:** Dockerfile del backend.

**Captura 16:** Imagen del backend.

**Captura 17:** Backend funcionando.

---

# 13. Actividad 10 — Despliegue de la base de datos

Seleccionar y desplegar un sistema gestor de base de datos.

La solución deberá incluir:

* Imagen Docker.
* Contenedor.
* Usuario.
* Contraseña.
* Base de datos.
* Volumen.
* Red Docker.

El motor utilizado dependerá de la tecnología seleccionada.

### Evidencia

**Captura 18:** Contenedor de base de datos funcionando.

**Captura 19:** Base de datos creada.

**Captura 20:** Volumen asociado a la base de datos.

---

# 14. Actividad 11 — Comunicación Backend–Base de datos

Configurar el backend para conectarse correctamente con la base de datos.

La comunicación deberá realizarse mediante la red Docker.

Ejemplo:

```text
BACKEND
   │
   │ red Docker
   ▼
DATABASE
```

El aprendiz deberá demostrar que:

* El backend puede conectarse a la base de datos.
* Puede realizar operaciones de lectura.
* Puede realizar operaciones de escritura.
* Los datos permanecen almacenados.

### Evidencia

**Captura 21:** Configuración de conexión.

**Captura 22:** Operación de lectura.

**Captura 23:** Operación de escritura.

**Captura 24:** Logs mostrando comunicación exitosa.

---

# 15. Actividad 12 — Comunicación Frontend–Backend

Configurar el frontend para consumir la API o servicios proporcionados por el backend.

Ejemplo:

```text
FRONTEND
   │
   │ HTTP / REST
   ▼
BACKEND
   │
   ▼
DATABASE
```

El frontend deberá permitir como mínimo:

* Consultar información.
* Registrar información.
* Actualizar información o realizar otra operación equivalente.
* Mostrar respuestas del backend.

### Evidencia

**Captura 25:** Frontend funcionando.

**Captura 26:** Solicitud del frontend hacia el backend.

**Captura 27:** Respuesta recibida desde el backend.

---

# 16. Actividad 13 — Integración de la aplicación

Integrar los tres componentes:

```text
┌──────────────┐
│   FRONTEND   │
└──────┬───────┘
       │
       │ HTTP
       ▼
┌──────────────┐
│   BACKEND    │
└──────┬───────┘
       │
       │
       ▼
┌──────────────┐
│  BASE DATOS  │
└──────────────┘
```

La aplicación deberá funcionar como un único sistema.

### Evidencia

**Captura 28:** Aplicación completa funcionando.

---

# 17. Actividad 14 — Docker Compose

Crear un archivo:

```text
docker-compose.yml
```

El archivo deberá permitir levantar la solución completa.

Como mínimo deberá contener:

```text
Frontend
Backend
Base de datos
Redes
Volúmenes
```

Ejecutar:

```bash
docker compose up -d
```

Comprobar:

```bash
docker compose ps
```

### Evidencia

**Captura 29:** Archivo Docker Compose.

**Captura 30:** Todos los servicios funcionando.

---

# 18. Actividad 15 — Prueba de recuperación

Detener los servicios:

```bash
docker compose stop
```

Comprobar su estado.

Posteriormente:

```bash
docker compose start
```

Realizar una segunda prueba utilizando:

```bash
docker compose down
docker compose up -d
```

Finalmente, reconstruir:

```bash
docker compose up -d --build
```

### Evidencia

**Captura 31:** Servicios detenidos.

**Captura 32:** Servicios recuperados.

**Captura 33:** Servicios reconstruidos.

---

# 19. Actividad 16 — Comprobación desde la intranet

Obtener la IP de la máquina virtual:

```bash
ip addr
```

Desde el equipo anfitrión acceder al frontend:

```text
http://IP_MAQUINA_VIRTUAL:PUERTO
```

Si la red de la máquina virtual está configurada como puente, realizar la prueba desde otro equipo conectado a la misma red.

### Evidencia

**Captura 34:** Aplicación funcionando desde el equipo anfitrión.

**Captura 35:** Aplicación funcionando desde otro equipo de la intranet.

---

# 20. Actividad 17 — Documentación de la solución

El aprendiz deberá documentar:

* Tecnologías seleccionadas.
* Arquitectura.
* Estructura del proyecto.
* Dockerfiles.
* Docker Compose.
* Redes.
* Volúmenes.
* Variables de entorno.
* Puertos.
* Servicios.
* Comandos utilizados.
* Problemas encontrados.
* Soluciones implementadas.

---

# 21. Evidencias de aprendizaje

| N.º | Evidencia               | Resultado esperado             |
| ---: | ----------------------- | ------------------------------ |
|    1 | Selección tecnológica | Arquitectura definida          |
|    2 | Máquina virtual        | Linux funcionando              |
|    3 | Red virtual             | IP y conectividad              |
|    4 | Docker                  | Servicio operativo             |
|    5 | Primer contenedor       | Contenedor funcionando         |
|    6 | Administración         | Operaciones Docker             |
|    7 | Portainer               | Gestión gráfica              |
|    8 | Volúmenes              | Persistencia                   |
|    9 | Dockerfile frontend     | Imagen y contenedor            |
|   10 | Dockerfile backend      | Imagen y contenedor            |
|   11 | Base de datos           | BD funcionando                 |
|   12 | Backend–BD             | Comunicación exitosa          |
|   13 | Frontend–Backend       | API funcionando                |
|   14 | Integración            | Aplicación multicapa          |
|   15 | Docker Compose          | Todos los servicios integrados |
|   16 | Recuperación           | Servicios restaurados          |
|   17 | Intranet                | Acceso desde otros equipos     |
|   18 | Documentación          | Informe técnico               |

---

# 22. Requisitos mínimos del proyecto

La aplicación desarrollada deberá cumplir:

* Tener frontend, backend y base de datos.
* Utilizar al menos tres contenedores.
* Utilizar Docker Compose.
* Utilizar al menos una red Docker.
* Utilizar al menos un volumen.
* Utilizar variables de entorno.
* Tener comunicación frontend → backend.
* Tener comunicación backend → base de datos.
* Permitir registrar y consultar información.
* Poder reconstruirse mediante Docker Compose.
* Mantener los datos después de reiniciar los contenedores.
* Ser accesible desde el equipo anfitrión.
* Ser accesible desde la intranet cuando la configuración de red lo permita.

---

# 23. Libertad tecnológica

No se evaluará el uso de un lenguaje o framework específico.

La evaluación estará centrada en:

**Funcionalidad + integración + Dockerización + comunicación + persistencia + documentación.**

Por ejemplo, son válidas soluciones como:

```text
React + Node.js + PostgreSQL
```

```text
Angular + Spring Boot + MySQL
```

```text
Vue + Laravel + MariaDB
```

```text
Next.js + FastAPI + PostgreSQL
```

```text
HTML/JavaScript + Django + PostgreSQL
```

```text
React + ASP.NET Core + SQL Server
```

o cualquier otra combinación técnicamente compatible.

---

# 24. Producto final

El resultado será una **aplicación multicapa completamente funcional y dockerizada**, desplegada dentro de una máquina virtual Linux.

```text
                         INTRANET
                            │
                            ▼
                  ┌──────────────────┐
                  │ MÁQUINA VIRTUAL  │
                  │                  │
                  │  Ubuntu Server   │
                  │                  │
                  │     Docker       │
                  │                  │
                  │ ┌──────────────┐ │
                  │ │   FRONTEND   │ │
                  │ └──────┬───────┘ │
                  │        │         │
                  │        ▼         │
                  │ ┌──────────────┐ │
                  │ │   BACKEND    │ │
                  │ └──────┬───────┘ │
                  │        │         │
                  │        ▼         │
                  │ ┌──────────────┐ │
                  │ │  BASE DATOS  │ │
                  │ └──────────────┘ │
                  │                  │
                  │  RED + VOLUMEN   │
                  └──────────────────┘
```

## Resultado esperado

Al finalizar, el aprendiz deberá demostrar que puede **seleccionar tecnologías, dockerizar una aplicación multicapa, desplegar sus componentes en Linux mediante Docker, establecer la comunicación entre frontend, backend y base de datos, administrar los servicios y hacer que la aplicación sea accesible desde una red local**.
