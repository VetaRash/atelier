const express = require('express');
const config = require('config');
const client = require('./db');

const app = express();

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/order', require('./routes/order.routes'));
app.use('/api/infoTable', require('./routes/infoTable.routes'));


const PORT = config.get('port') || 5000;

async function start() {
    try {
        await client.connect();
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}....`));

    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}
start();