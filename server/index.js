const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12671840',
  password: 'zKm7nD1wfS',
  database: 'sql12671840',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Fetch sectors from the database
app.get('/sectors', (req, res) => {
  let query = '';
  if (req.query && req.query.with === 'parent') {
    query = 'SELECT sectors.*, p.name as parent_name FROM sectors left join sectors as p on p.id = sectors.parent_id order by sectors.name asc';
  } else {
    query = 'SELECT * FROM sectors order by name asc';
  }
  db.query(query, (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// Save sectors data to the database
app.post('/sectors/store', (req, res) => {
  const { name, sector } = req.body;
  const query = 'INSERT INTO sectors (name, parent_id) VALUES (?, ?)';

  db.query(query, [name, sector], (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Data saved successfully' });
    }
  });
});

// fetch user data from the database
app.get('/users', (req, res) => {
  const query = 'SELECT users.*,sectors.name as sector_name FROM users left join sectors on sectors.id = users.sector order by users.id desc';

  db.query(query, (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// Save user data to the database
app.post('/users/store', (req, res) => {
  const { name, sector, agree } = req.body;
  const query = 'INSERT INTO users (name, sector, agree) VALUES (?, ?, ?)';

  db.query(query, [name, sector, agree], (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Data saved successfully' });
    }
  });
});

// fetch single user data from the database
app.get('/users/:id', (req, res) => {
  const query = 'SELECT * FROM users where id = ' + req.params.id;

  db.query(query, (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.json({});
      }
    }
  });
});


// fetch single user data from the database
app.patch('/users/update/:id', (req, res) => {
  const { name, sector, agree } = req.body;
  const query = 'UPDATE users set name = ?, sector = ?, agree = ? where id = ?';

  db.query(query, [name, sector, agree, req.params.id], (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
