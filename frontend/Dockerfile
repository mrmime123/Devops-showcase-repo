# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json desde el contexto raíz
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install

# Copiar el resto del código fuente desde el contexto raíz
COPY frontend/ ./
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiar el build generado a la carpeta pública de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Opcional: nginx.conf si usas rutas dinámicas en SPA
# COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
