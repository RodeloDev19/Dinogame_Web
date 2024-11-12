# Usa una imagen base de Node.js
FROM node:16

# Crea el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencia y los instala
COPY DINOGAME/package*.json ./
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY DINOGAME .

# Construye la aplicación si es necesario
RUN npm run build

# Expone el puerto que usa la aplicación (modifícalo si es necesario)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
