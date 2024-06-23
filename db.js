const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost", // Replace with your host
  user: "root", // Replace with your database username
  password: "", // Replace with your database password
  database: "clubninty", // Replace with your database name
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

module.exports = connection;
