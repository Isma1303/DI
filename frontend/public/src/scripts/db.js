const mysql = require('mysql2/promise');
require('dotenv').config();

async function addContactInfo(name, email, message) {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.host,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database,
            port: parseInt(process.env.port),
            ssl: {
                rejectUnauthorized: false
            }
        });
        
        console.log('Conectado a la base de datos correctamente');
        console.log('Intentando insertar:', { name, email, message });
        
        const query = 'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)';
        const [result] = await connection.execute(query, [name, email, message]);
        
        console.log('Datos insertados correctamente:', result);
        return { success: true, id: result.insertId };
    } catch (error) {
        console.error('Database error details:', error.code, error.sqlMessage || error.message);
        console.error('Full error:', error);
        return { success: false, error: error.message };
    } finally {
        if (connection) await connection.end();
    }
}

module.exports = {
    addContactInfo
};



