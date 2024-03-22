require('dotenv').config()

const config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: 'localhost',
        dialect: 'postgres'
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_TEST,
        host: 'localhost',
        dialect: 'postgres'
    },
}

module.exports = config