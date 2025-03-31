import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

//Initialize Sequalize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: process.env.DB_LOGGING === "true", // Disable logging for cleaner output
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database using Sequelize");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export { sequelize };
