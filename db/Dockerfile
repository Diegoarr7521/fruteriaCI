#Imagen oficial de postgres
FROM postgres:latest

# variables de entorno 
ENV POSTGRES_DB=fruteria
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=1234

# Copia el archivo de inicialización de SQL en la imagen de Docker
COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
