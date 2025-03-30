import mysql from "mysql2";

//Create mysql connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todolist",
});

//compile mysql connection
db.connect((err) => {
  if (err) {
    console.log("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

const createTableQuery = `CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task VARCHAR(255) NOT NULL,
  isChecked BOOLEAN DEFAULT FALSE
);`;

db.query(createTableQuery, (err, result) => {
  if (err) {
    console.log("Error creating table:", err);
    result;
  }
  console.log("Table created or already exists");
});

export default db;
