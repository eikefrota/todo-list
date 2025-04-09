import { getConnection, closeConnection } from './db.js';

const createTableUser = async () => {
    const pool = getConnection ()
    try {


        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY ,
                usuario TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL
                );
            `)
            console.log('Tabela users criada com sucesso!')
    } catch (error) {
        console.error('Erro ao criar tabela users:', error);
    } finally {
        closeConnection()
    }
}

const createTableTarefas = async () => {
    const pool = getConnection();
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS tarefas (
                id SERIAL PRIMARY KEY,
                titulo TEXT NOT NULL,
                descricao TEXT,
                status TEXT NOT NULL,
                data_criacao DATE NOT NULL,
                data_conclusao DATE,
                user_id INTEGER NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `);
        console.log('Tabela tarefas criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar tabela tarefas:', error);
    } finally {
        closeConnection();
    }
};

createTableTarefas()
createTableUser()