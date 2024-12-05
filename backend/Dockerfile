# Utiliza la imagen oficial de Node.js
FROM node:14

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
