const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

// Define database connection configurations for each database
const dbConfigs = [
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'ky040_db',
    },
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'ds18b20_db',
    },
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'hcsr04_db',
    },
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'fsr_db',
    },
];

// Create a MySQL database connection pool for each database
const pools = dbConfigs.map((dbConfig) => mysql.createPool(dbConfig));

// Define routes for each database
const routes = ['/ky040', '/ds18b20', '/hcsr04', '/fsr'];

// Create routes for each database
routes.forEach((route, index) => {
    const pool = pools[index];

    app.get(route, (req, res) => {
        const sql = `SELECT * FROM ${route.slice(1)}`; // Remove the leading slash

        pool.query(sql, (queryErr, results) => {
            if (queryErr) {
                console.error('Query failed:', queryErr);
                res.status(500).json({ error: 'Query failed' });
            } else {
                const data = results;
                // console.log('Query results:', data);
                // console.log("Succesfully fetched");
                res.json(data);
            }
        });
    });

    app.delete(route, (req, res) => {
        const tableName = route.slice(1); // Remove the leading slash
        const sqlDelete = `DELETE FROM ${tableName}`;
        const sqlResetAutoIncrement = `ALTER TABLE ${tableName} AUTO_INCREMENT = 1`;
    
        pool.query(sqlDelete, (deleteErr, deleteResults) => {
            if (deleteErr) {
                console.error('Delete query failed:', deleteErr);
                res.status(500).json({ error: 'Delete query failed' });
            } else {
                console.log('Data deleted successfully');
    
                // Reset auto-increment value after successful deletion
                pool.query(sqlResetAutoIncrement, (resetErr, resetResults) => {
                    if (resetErr) {
                        console.error('Reset auto-increment failed:', resetErr);
                    } else {
                        console.log('Auto-increment reset successfully');
                    }
                });
    
                res.json({ message: 'Data deleted successfully' });
            }
        });
    });
});



// Start the Express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
