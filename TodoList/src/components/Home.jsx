import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./Home.css";
import Popupform from "./PopupForm";

function Home() {
  const [count, setCount] = useState([]); // Initialize as an empty array
  const [task, setTask] = useState(""); // Separate state for the input field
  const [isChecked, setIsChecked] = useState(false); // State to manage checkbox
  const [description, setDescription] = useState(""); // State to manage description
  const [isModelOpen, setIsModelOpen] = useState(false); // State to manage modal visibility
  useEffect(() => {
    // Fetch tasks from the server when the component mounts
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        // console.log(response.data); // Handle success response
        setCount(response.data); // Set the tasks in the state
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error); // Handle error response
      });
  }, []); // Empty dependency array to run only once on mount

  const handleAddTask = (task, description) => {
    axios
      .post("http://localhost:5000/tasks", { task, description })
      .then((response) => {
        //   console.log(response.data); // Handle success response
        setCount([
          ...count,
          { id: response.data.id, task, description, isChecked: false },
        ]); // Add the new task to the array
      })
      .catch((error) => {
        console.error("Error adding task:", error); // Handle error response
      });

    // setTask(""); // Clear the input field
    // setDescription(""); // Clear the description field
  };

  const handledelete = (taskId) => {
    axios
      .delete(`http://localhost:5000/tasks/${taskId}`)
      .then((response) => {
        // console.log(response.data); // Handle success response

        setCount(count.filter((item) => item.id !== taskId)); // remove task from the array
      })
      .catch((error) => {
        console.error("Error deleting task:", error); // Handle error response
      });
  };

  const handleedit = (taskId, isChecked) => {
    setCount(
      count.map((item) =>
        item.id === taskId ? { ...item, isChecked: !item.isChecked } : item
      )
    );
    // console.log(count);

    axios
      .put(`http://localhost:5000/tasks/isChecked/${taskId}`, {
        isChecked: !isChecked,
      })
      .then(() => {
        // console.log("Task updated successfully");
      })
      .catch((error) => {
        console.error("Error updating task:", error); // Handle error response
        // Revert the change if the query fails
        setCount(
          count.map((item) =>
            item.id === taskId ? { ...item, isChecked: isChecked } : item
          )
        );
      });
  };

  return (
    <div
      className="home"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        className="card_container"
        style={{
          backgroundColor: "#f8f9fa",
          padding: "2rem 5rem",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "800px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <h1 className="my-2 heading text-center">TodoList</h1>

        <div className="form-group align-self-center d-flex justify-content-center w-100">
          <button
            className="btn btn-primary mx-2 w-50"
            onClick={() => setIsModelOpen(true)}
          >
            Add
          </button>
        </div>

        <div className="list" style={{ marginTop: "2rem", flexGrow: "1" }}>
          <ul
            style={{ padding: "0", display: "flex", flexDirection: "column" }}
            className="list-group"
          >
            {count.length === 0 ? (
              <li className="list-group-item">No Task</li>
            ) : (
              count.map((item, index) => (
                <li
                  key={item.id} // Use index as fallback key if id is not available
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{ marginTop: "1rem" }}
                >
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <input
                      type="checkbox"
                      className="mx-2 checkbox"
                      checked={item.isChecked}
                      onChange={() => handleedit(item.id, item.isChecked)}
                    />
                    <span
                      style={{
                        textDecoration: item.isChecked
                          ? "line-through"
                          : "none",
                        color: item.isChecked ? "gray" : "",
                      }}
                    >
                      {item.task}
                    </span>
                  </div>
                  <div
                    className="button-group"
                    style={{ display: "flex", gap: "1rem" }}
                  >
                    <button
                      className="btn btn-danger"
                      onClick={() => handledelete(item.id)}
                    >
                      Delete
                    </button>
                    <div class="dropdown-center">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></button>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#">
                            Action
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            Another action
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <Popupform
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
        handleAddTask={handleAddTask}
      />
    </div>
  );
}

export default Home;
