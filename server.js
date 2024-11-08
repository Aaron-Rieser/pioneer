const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Database configuration
const pool = new Pool({
    user: 'postgres',
    host: process.env.PGHOST || 'localhost',
    database: 'railway',
    password: 'EBOjboEnFxHZKKgAfiiBPhgJpqNbDTqH',
    port: 5432,
});

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/posts', async (req, res) => {
    try {
        const { neighbourhood, username, post } = req.body;
        const query = 'INSERT INTO posts (neighbourhood, username, post) VALUES ($1, $2, $3) RETURNING *';
        const values = [neighbourhood, username, post];
        
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating post' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});