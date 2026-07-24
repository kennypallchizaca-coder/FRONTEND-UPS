# Guia de Despliegue e Instalacion Completa -- Frontend CRM (React 19 + Vite + Docker)

Esta guia contiene el procedimiento paso a paso, detallado y libre de fallos para instalar los requisitos previos, clonar el repositorio, configurar las variables de entorno, construir las imagenes de Docker y desplegar la aplicacion frontend (React 19 + Vite 8 + TypeScript + Tailwind CSS v4) en cualquier entorno.

---

## Tabla de Contenidos

1. Paso 1: Instalacion de Requisitos Previos del Sistema
2. Paso 2: Clonacion del Repositorio desde Git
3. Paso 3: Configuracion del Archivo de Variables de Entorno (.env)
   - Metodo A: Configuracion Manual a Mano (Recomendado)
   - Metodo B: Configuracion Automatica via Script
4. Paso 4: Explicacion Detallada de Cada Variable de Entorno
5. Paso 5: Compilacion y Despliegue con Docker Compose (Desarrollo Local)
6. Paso 6: Verificacion de la Aplicacion y Conectividad con el Backend
7. Paso 7: Despliegue en Entornos de Produccion (Servidor VPS / Nube)
8. Paso 8: Ejecucion Manual en Modo Desarrollo sin Docker (pnpm run dev)
9. Paso 9: Compilacion y Ejecucion de Contenedor Individual (Docker CLI)
10. Referencia de Comandos Utiles de Docker
11. Explicacion Tecnica del Servidor Nginx y Enrutamiento SPA
12. Guia de Diagnostico y Solucion de Fallos Frecuentes

---

## 1. Paso 1: Instalacion de Requisitos Previos del Sistema

Para garantizar que el despliegue no falle, asegurese de contar con las siguientes herramientas instaladas y activas en su maquina local o servidor:

### 1.1 Git
* **Descripcion**: Control de versiones necesario para clonar el proyecto.
* **Verificacion**: Ejecute en su terminal:
  ```bash
  git --version
  ```
* **Instalacion**:
  * **Windows**: Descargar el instalador desde https://git-scm.com/download/win
  * **Linux (Ubuntu/Debian)**: `sudo apt update && sudo apt install -y git`
  * **macOS**: `brew install git` o instalador de Xcode Command Line Tools.

### 1.2 Docker Engine y Docker Desktop
* **Descripcion**: Motor de contenedores requerido para ejecutar el Frontend y Nginx.
* **Verificacion**:
  ```bash
  docker --version
  ```
* **Instalacion**:
  * **Windows**: Descargar e instalar Docker Desktop desde https://docs.docker.com/desktop/install/windows-install/. Asegurarse de tener habilitada la caracteristica WSL 2 (Windows Subsystem for Linux).
  * **Linux (Ubuntu/Debian)**:
    ```bash
    sudo apt update
    sudo apt install -y ca-certificates curl gnupg
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt update
    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    sudo usermod -aG docker $USER
    ```
  * **macOS**: Descargar Docker Desktop desde https://docs.docker.com/desktop/install/mac-install/.

### 1.3 Docker Compose
* **Descripcion**: Herramienta de orquestacion de contenedores (incluida nativamente en Docker Desktop y Docker Compose v2 en Linux).
* **Verificacion**:
  ```bash
  docker compose version
  ```

---

## 2. Paso 2: Clonacion del Repositorio desde Git

Abra una terminal (PowerShell, CMD, Git Bash o Terminal de Linux) y ejecute los siguientes comandos:

```bash
# 1. Clonar el repositorio
git clone https://github.com/Computacion-UPS/icc-pp-landing.git ComputacionCRM

# 2. Entrar a la carpeta del proyecto
cd ComputacionCRM
```

---

## 3. Paso 3: Configuracion del Archivo de Variables de Entorno (.env)

El archivo `.env` controla la direccion a la que se conectara el Frontend y el puerto en el que escuchara la pagina web.

### Metodo A: Configuracion Manual a Mano (Recomendado)

1. En la raiz de `ComputacionCRM`, copie el archivo `.env.example` para crear el archivo `.env`:

   * **En Linux / macOS:**
     ```bash
     cp .env.example .env
     ```
   * **En Windows (PowerShell):**
     ```powershell
     Copy-Item .env.example .env
     ```

2. Abra el archivo `.env` recien creado con cualquier editor de texto (VS Code, Notepad, Nano) y confirme su contenido:

   **Para Desarrollo Local (por defecto):**
   ```env
   # URL base de la API backend. En Docker Compose con Nginx se usa /api.
   VITE_API_BASE_URL=/api

   # Nombre oficial de la aplicacion
   VITE_APP_NAME=Carrera de Computacion UPS (Local)

   # Entorno de ejecucion
   VITE_APP_ENV=development

   # Puerto del servidor host donde escuchara la pagina web
   FRONTEND_PORT_HOST=3000
   ```

   **Para Produccion (Servidor VPS o Nube):**
   ```env
   # URL base de la API backend en produccion
   VITE_API_BASE_URL=/api

   # Nombre oficial de la aplicacion
   VITE_APP_NAME=Carrera de Computacion UPS

   # Entorno de ejecucion
   VITE_APP_ENV=production

   # Puerto del servidor host en produccion (puerto HTTP estandar 80)
   FRONTEND_PORT_HOST=80
   ```

### Metodo B: Configuracion Automatica via Script (Opcional)

Si prefiere que un script cree el archivo `.env` automaticamente:

* **En Windows (PowerShell):**
  ```powershell
  powershell -ExecutionPolicy Bypass -File .\deployment\scripts\setup-env.ps1 dev
  ```
* **En Linux / macOS (Bash):**
  ```bash
  bash deployment/scripts/setup-env.sh dev
  ```

---

## 4. Paso 4: Explicacion Detallada de Cada Variable de Entorno

| Variable | Descripcion | Entorno Dev | Entorno Produccion | Impacto si no se configura |
|---|---|---|---|---|
| `VITE_API_BASE_URL` | URL base de la API backend consumida por React | `/api` | `/api` o `https://api.tu-dominio.com/api` | Si se omite, se usa `/api` por defecto. |
| `VITE_APP_NAME` | Nombre mostrado en la aplicacion | `Carrera de Computacion UPS (Local)` | `Carrera de Computacion UPS` | Define el nombre visible en la cabecera. |
| `VITE_APP_ENV` | Define el modo de compilacion de React | `development` | `production` | Controla advertencias en consola. |
| `FRONTEND_PORT_HOST` | Puerto del host donde se expone la aplicacion | `3000` | `80` o `443` | Si el puerto esta ocupado, el build falla. |

> **Nota de Seguridad**: El frontend no almacena llaves de base de datos, secretos JWT ni passwords SMTP. Todas esas variables pertenecen de forma exclusiva al repositorio backend.

---

## 5. Paso 5: Compilacion y Despliegue con Docker Compose (Desarrollo Local)

Una vez preparado el archivo `.env`, ejecute el siguiente comando en la raiz de `ComputacionCRM`:

```bash
docker compose up --build -d
```

### ¿Que hace este comando paso a paso?
1. **Etapa 1 (Compilacion)**: Descarga Node.js 22 Alpine, instala las dependencias (`pnpm install --frozen-lockfile`) y compila la SPA (`pnpm run build`) creando la carpeta de activos estaticos `dist/`.
2. **Etapa 2 (Servidor Web)**: Descarga Nginx 1.27 Alpine, copia los archivos estaticos compilados hacia `/usr/share/nginx/html` y aplica el archivo de configuracion `nginx.conf`.
3. **Etapa 3 (Ejecucion)**: Levanta el contenedor `crm-frontend` escuchando en el puerto `3000` del host y ejecuta el analisis de salud (`healthcheck`).

### Verificar Estado de Ejecucion
Para asegurarse de que el despliegue no haya fallado:
```bash
docker compose ps
```
Debe observar `crm-frontend` con estado `STATUS: Up` o `healthy`.

---

## 6. Paso 6: Verificacion de la Aplicacion y Conectividad con el Backend

### 6.1 Acceso al Frontend
Abra su navegador de internet e ingrese a:
`http://localhost:3000`

### 6.2 Verificacion de la Conexion Automatica con el Backend
La aplicacion frontend en Docker se comunica de forma transparente con el backend:
1. Cuando el usuario interactua con la pagina (ejemplo: formulario de admisiones en `http://localhost:3000/interesados`), React realiza peticiones HTTP a la ruta relativa `/api/leads/submit`.
2. El servidor Nginx dentro del contenedor recibe la solicitud `/api/` y la reenvia internamente a la API de Strapi en `http://localhost:1337/api`.
3. **Resultado**: La conexion entre el Frontend y el Backend funciona automaticamente fuera de la caja, evitando errores de Cross-Origin Resource Sharing (CORS).

---

## 7. Paso 7: Despliegue en Entornos de Produccion (Servidor VPS / Nube)

Para publicar la aplicacion en un servidor de produccion Linux:

1. Clonar el repositorio en el servidor:
   ```bash
   git clone https://github.com/Computacion-UPS/icc-pp-landing.git ComputacionCRM
   cd ComputacionCRM
   ```
2. Crear el archivo `.env` de produccion:
   ```bash
   cp deployment/env/.env.production .env
   ```
3. Ejecutar Docker Compose con el archivo de sobrescritura de produccion (asigna limites de RAM y politica de auto-reinicio):
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
   ```

---

## 8. Paso 8: Ejecucion Manual en Modo Desarrollo sin Docker (pnpm run dev)

Si un desarrollador desea trabajar directamente en su maquina local sin Docker:

1. Instalar Node.js v20+ y pnpm.
2. Instalar dependencias del proyecto:
   ```bash
   pnpm install
   ```
3. Crear `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
4. Iniciar servidor de desarrollo con recarga rapida (HMR):
   ```bash
   pnpm run dev
   ```
5. Acceder a `http://localhost:5173`.

---

## 9. Paso 9: Compilacion y Ejecucion de Contenedor Individual (Docker CLI)

Si requiere construir y probar la imagen del frontend usando la CLI de Docker sin Docker Compose:

```bash
# 1. Construir la imagen
docker build -t crm-frontend:latest .

# 2. Ejecutar el contenedor mapeando el puerto 3000 al puerto 80 de Nginx
docker run -d --name crm-frontend -p 3000:80 crm-frontend:latest
```

---

## 10. Referencia de Comandos Utiles de Docker

* **Ver logs del frontend en tiempo real**:
  ```bash
  docker compose logs -f frontend
  ```
* **Detener los servicios**:
  ```bash
  docker compose down
  ```
* **Reiniciar el contenedor**:
  ```bash
  docker compose restart
  ```
* **Ver uso de recursos (RAM y CPU)**:
  ```bash
  docker stats
  ```
* **Reconstruir la imagen sin cache de Docker**:
  ```bash
  docker compose build --no-cache
  docker compose up -d
  ```

---

## 11. Explicacion Tecnica del Servidor Nginx y Enrutamiento SPA

El contenedor del frontend utiliza Nginx 1.27 Alpine debido a las siguientes razones de arquitectura:

1. **Enrutamiento SPA (`try_files`)**:
   En React Router, las rutas dinamicas (`/interesados`, `/empresas`, `/noticias`) no existen como archivos fisicos. Nginx aplica la regla:
   ```nginx
   try_files $uri $uri/ /index.html;
   ```
   Esto asegura que al recargar una ruta secundaria con F5 no se genere un error 404, sirviendo siempre el `index.html` principal.

2. **Compresion Gzip**:
   Comprime archivos JS, CSS, HTML y SVG reduciendo el tamaño de transferencia hasta en un 70%.

3. **Headers de Seguridad HTTP**:
   Agrega `X-Frame-Options`, `X-Content-Type-Options` y `Referrer-Policy` para prevenir vulnerabilidades web.

---

## 12. Guia de Diagnostico y Solucion de Fallos Frecuentes

### Fallo 1: El puerto 3000 ya esta en uso por otra aplicacion
* **Sintoma**: Error `bind: address already in use` al ejecutar `docker compose up`.
* **Solucion**: Edite el archivo `.env` y cambie `FRONTEND_PORT_HOST=3000` por otro puerto libre, ejemplo: `FRONTEND_PORT_HOST=3001`. Luego ejecute `docker compose up -d`.

### Fallo 2: Docker Desktop no esta ejecutandose (en Windows / macOS)
* **Sintoma**: Error `Cannot connect to the Docker daemon`.
* **Solucion**: Abra la aplicacion Docker Desktop en su sistema operativo y espere a que la barra de estado indique que el motor esta activo (`Docker Engine is running`).

### Fallo 3: Error 404 al navegar o recargar paginas en el navegador
* **Sintoma**: Al ingresar directamente a `http://localhost:3000/interesados` aparece un error 404.
* **Solucion**: Verifique que el archivo `nginx.conf` en la raiz del proyecto no haya sido modificado y mantenga la regla `try_files $uri $uri/ /index.html;`. Reconstruya la imagen con `docker compose build --no-cache`.

### Fallo 4: El Frontend no carga datos del Backend
* **Sintoma**: La interfaz carga la estructura web pero las noticias o formularios no reciben respuesta.
* **Solucion**: Verifique que el backend Strapi este ejecutandose y respondiendo en `http://localhost:1337/api`. Compruebe que la variable `VITE_API_BASE_URL` en `.env` este configurada como `/api` (cuando se usa Docker Compose) o como la URL absoluta del backend.
