# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json desde el contexto raíz
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install

# Copiar el resto del código fuente desde el contexto raíz
COPY frontend/ ./

# Declara el argumento de construcción
ARG VITE_API_BASE_URL
# Establece la variable de entorno que Vite usará durante la construcción
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
# Construir la aplicación
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiar el build generado a la carpeta pública de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Opcional: nginx.conf si usas rutas dinámicas en SPA
# COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
