import { sequelize } from "./db.js";
import { DataTypes } from "sequelize";

// Define the Tasks model
const Task = sequelize.define(
  "tasks",
  {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isChecked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
  },
  {
    timestamps: false, // Disable automatic createdAt and updatedAt columns
  }
);

// Sync the model with the database
sequelize
  .sync({ force: false }) // Set force: true to drop and recreate the table if it exists
  .then(() => {
    console.log("Tasks table created or already exists");
  })
  .catch((err) => {
    console.error("Error creating Tasks table:", err);
  });

export { Task };
