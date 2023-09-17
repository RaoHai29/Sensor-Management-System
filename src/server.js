const express = require('express');
const mysql = require('mysql');
var cors = require('cors')

const app = express();
app.use(cors())
// Database connection configuration
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'ky040_db',
};

// Create a MySQL database connection pool
const pool = mysql.createPool(dbConfig);

// Express route to fetch data from the database
app.get('/data', (req, res) => {
  // SQL query to select data from the "ky040" table
  const sql = 'SELECT * FROM ky040'; // Change to your table name

  // Execute the query using the connection pool
  pool.query(sql, (queryErr, results) => {
    if (queryErr) {
      console.error('Query failed:', queryErr);
      res.status(500).json({ error: 'Query failed' });
    } else {
      const data = results;
      console.log('Query results:', data);
      res.json(data);
    }
  });
});

// Start the Express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
