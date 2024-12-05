# imagen oficial de Node.js
FROM node:14 as build

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar el resto de la aplicación
COPY . .

#contenido estático
FROM nginx:alpine
COPY --from=build /app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
