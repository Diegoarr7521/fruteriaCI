const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');  

const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'fruteria',
    password: '1234',
    port: 5432,
});

// Middleware
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Endpoints con logs de depuración
app.get('/api/frutas', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT f.id, f.nombre_fruta, i.cantidad, p.precio_fruta
            FROM frutas f
            LEFT JOIN inventario i ON f.nombre_fruta = i.nombre_fruta
            LEFT JOIN precios p ON f.nombre_fruta = p.nombre_fruta
        `);
        console.log(result.rows);  // Log para ver los resultados de la consulta
        res.json(result.rows);
    } catch (err) {
        console.error('Error al obtener frutas:', err);  
        res.status(500).json({ error: 'Error al obtener frutas' });
    }
});

app.post('/api/frutas', async (req, res) => {
    const { nombre_fruta, cantidad, precio_fruta } = req.body;
    try {
        await pool.query('INSERT INTO frutas (nombre_fruta) VALUES ($1)', [nombre_fruta]);
        await pool.query('INSERT INTO inventario (nombre_fruta, cantidad) VALUES ($1, $2)', [nombre_fruta, cantidad]);
        await pool.query('INSERT INTO precios (nombre_fruta, precio_fruta) VALUES ($1, $2)', [nombre_fruta, precio_fruta]);

        res.json({ success: true });
    } catch (err) {
        console.error('Error al añadir fruta:', err);  
        res.status(500).json({ error: 'Error al añadir fruta' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
