# -- Etapa 1: Dependencias -------------------------------------------------- #
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# -- Etapa 2: Compilacion --------------------------------------------------- #
FROM deps AS build
WORKDIR /app

# La variable VITE_API_BASE_URL se inyecta en tiempo de build porque Vite
# la incrusta como literal en el bundle JS. En produccion, el frontend
# se comunica con el backend a traves del proxy inverso Nginx (/api).
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

COPY . .
RUN npm run build

# -- Etapa 3: Servidor de produccion ---------------------------------------- #
FROM nginx:1.27-alpine AS production

# Eliminar la configuracion por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar la configuracion personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los assets compilados desde la etapa de build
COPY --from=build /app/dist /usr/share/nginx/html

# Crear usuario no-root para Nginx (nginx ya corre como nginx user en alpine)
# Ajustar permisos de los archivos estaticos
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    # Crear directorios necesarios para Nginx con permisos correctos
    mkdir -p /var/cache/nginx /var/log/nginx /var/run && \
    chown -R nginx:nginx /var/cache/nginx /var/log/nginx /var/run

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO /dev/null http://127.0.0.1:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
