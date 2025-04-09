import fs from 'fs';
import { getConnection, closeConnection } from './db.js';
import express from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';


const app = express();
const pool = getConnection();

app.use(express.json());

app.get('/api/tarefas' , async (req, res) => {
    const pool = getConnection()
    try {
        const result = await pool.query(`SELECT * FROM tarefas`)
        res.status(200).json(result.rows)
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).json({ error: 'Erro ao buscar tarefas' });
    } finally {
        closeConnection()
    }
})

app.post('/api/tarefas', async (req, res) => {
    const pool = getConnection()
    const { titulo, descricao, status, data_criacao, data_conclusao, user_id } = req.body
    try {
        const result = await pool.query(`INSERT INTO tarefas (titulo, descricao, status, data_criacao, data_conclusao, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [titulo, descricao, status, data_criacao, data_conclusao, user_id])
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        res.status(500).json({ error: 'Erro ao criar tarefa' });
    } finally {
        closeConnection()
    }
})










app.listen(process.env.SERVER_PORT, () => {
    console.log(`SERVIDOR INICIADO NO ENDEREÇO http://localhost:${process.env.SERVER_PORT} `)
})
/// meu pau