const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const {secret} = require("./config");

function generateAccessToken(userId) {
    return jwt.sign({ userId }, secret, { expiresIn: '1h' });
}

const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'users',
    password: 'Qw1213qw',
    port: 5432,
};

const pool = new Pool(dbConfig);

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "USERS"');
        const data = result.rows;

        res.json(data);
    } catch (error) {
        console.error('Ошибка при запросе к базе данных:', error);
        res.status(500).json({ error: 'Ошибка при запросе к базе данных' });
    }
});

app.post('/api/register', async (req, res) => {
    const { login, password } = req.body;

    try {
        const existingUser = await pool.query('SELECT * FROM "USERS" WHERE login = $1', [login]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Пользователь с таким именем уже существует'});
        }

        const result = await pool.query('INSERT INTO "USERS" (login, password) VALUES ($1, $2) RETURNING *', [login, password]);
        const newUser = result.rows[0];
        const token = generateAccessToken(newUser.user_id);
        res.status(201).json({ token, user: newUser });

    } catch (error) {
        console.error('Ошибка при регистрации пользователя:', error);
        res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
    }
});

app.post('/api/login', async (req, res) => {
    const { login, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM "USERS" WHERE login = $1', [login]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Такого пользователя не существует' });
        }

        const storedPassword = user.rows[0].password;
        console.log('Stored Password:', JSON.stringify(storedPassword));
        console.log('Entered Password:', JSON.stringify(password));

        if (storedPassword.toString() !== password) {
            return res.status(400).json({ error: 'Неверный пароль' });
        }

        const token = generateAccessToken(user.rows[0].user_id);

        return res.json({ token });
    } catch (error) {
        console.error('Ошибка при входе пользователя:', error);
        res.status(500).json({ error: 'Ошибка при входе пользователя' });
    }
});

app.post('/api/addAnime', (req, res) => {
    try {
        const { userId, animeTitle } = req.body;

        const query = 'INSERT INTO "library" (user_id, anime) VALUES ($1, $2)';
        pool.query(query, [userId, animeTitle]);

        res.json({ message: 'Аниме успешно добавлено в библиотеку' });
    } catch (error) {
        console.error('Ошибка при добавлении аниме:', error);
        res.status(500).json({ error: 'Ошибка при добавлении аниме' });
    }
});

app.get('/api/library', async (req, res) => {
    try {
        const userId = req.query.userId;

        const query = 'SELECT * FROM library WHERE user_id = $1';
        const result = await pool.query(query, [userId]);

        res.json(result.rows);
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        res.status(500).json({ error: 'Ошибка при получении списка аниме' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});