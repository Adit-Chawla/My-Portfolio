const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import cors middleware
const path = require('path');

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Serve static files (your HTML, CSS, etc.)
app.use(express.static(path.join(__dirname)));



//ACTUAL DETAILS REMOVED FOR SECURITY REASONS!!  CONTACT ME FUNCTIONALITY WORKS WHEN CORRECT CREDS ARE ENTERED
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "",
  user: "",
  password: "",
  database: ""
});

// Log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Handle form submission
app.post('/submit-form', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  // Log form data
  console.log('Form data:', { name, email, subject, message });

  //SQL query to insert the form data
  const sql = `INSERT INTO contact_form (name, email, subject, message) VALUES (?, ?, ?, ?)`;

  // Executing the query
  pool.query(sql, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error submitting form');
      return;
    }
    console.log('Form data inserted successfully');
    res.send('Form submitted successfully!');
  });
});

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
