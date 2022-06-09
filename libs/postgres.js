const { Client } = require('pg')

async function getConection(){
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'root',
        password: 'admin123',
        database: 'codigos_referedos',
    })
    await client.connect()
    return client
}

module.exports = getConection