const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    password: '319846319846',
    host: 'localhost',
    port: 5432,
    database: 'course-project'
});

module.exports = client;