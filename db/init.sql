CREATE TABLE IF NOT EXISTS frutas (
    id SERIAL PRIMARY KEY,
    nombre_fruta VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS inventario (
    id SERIAL PRIMARY KEY,
    cantidad INT NOT NULL,
    nombre_fruta VARCHAR(50) NOT NULL,
    FOREIGN KEY (nombre_fruta) REFERENCES frutas(nombre_fruta)
);

CREATE TABLE IF NOT EXISTS precios (
    id SERIAL PRIMARY KEY,
    precio_fruta DECIMAL(5, 2) NOT NULL,
    nombre_fruta VARCHAR(50) NOT NULL,
    FOREIGN KEY (nombre_fruta) REFERENCES frutas(nombre_fruta)
);
