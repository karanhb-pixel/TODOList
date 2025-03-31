import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

//Define User model
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//sync the model with the database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("User table created or already exists");
  })
  .catch((error) => {
    console.error("Error creating User table:", error);
  });

export { User };
