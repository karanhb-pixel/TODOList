import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./Home.css";
import Popupform from "../popupForm/PopupForm";
import ExpandableItem from "../expandableItem/ExpandableItem";

function Home() {
  const [count, setCount] = useState([]); // Initialize as an empty array
  const [task, setTask] = useState(""); // Separate state for the input field
  const [isChecked, setIsChecked] = useState(false); // State to manage checkbox
  const [description, setDescription] = useState(""); // State to manage description
  const [isModelOpen, setIsModelOpen] = useState(false); // State to manage modal visibility
  const [openDescriptionId, setOpenDescriptionId] = useState(null); // State to manage which task's description is open

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          alert("You are not Logged in!");
        }

        // Fetch tasks from the server when the component mounts
        axios
          .get("http://localhost:5000/tasks", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setCount(response.data); // Set the tasks in the state
          });
      } catch (error) {
        if (error.response && error.response.data) {
          // Check if the server returned a specific error message
          const errorMessage =
            error.response.data.error || "An error occurred.";
          alert(`${errorMessage}`);
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      }
    };
    fetchTasks();
  }, []); // Empty dependency array to run only once on mount

  const handleAddTask = (task, description) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You are not Logged in!");
    }

    axios
      .post(
        "http://localhost:5000/tasks",
        { task, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setCount([
          ...count,
          { id: response.data.id, task, description, isChecked: false },
        ]); // Add the new task to the array
      })
      .catch((error) => {
        console.error("Error adding task:", error); // Handle error response
      });
  };

  const handledelete = (taskId) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You are not Logged in!");
    }

    axios
      .delete(`http://localhost:5000/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCount(count.filter((item) => item.id !== taskId)); // remove task from the array
      })
      .catch((error) => {
        console.error("Error deleting task:", error); // Handle error response
      });
  };

  const handleedit = (taskId, isChecked) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You are not Logged in!");
    }
    setCount(
      count.map((item) =>
        item.id === taskId ? { ...item, isChecked: !item.isChecked } : item
      )
    );
    axios
      .put(
        `http://localhost:5000/tasks/isChecked/${taskId}`,
        {
          isChecked: !isChecked,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {})
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

  //this function is used to toggle the description of the task
  const toggleDescription = (taskId) => {
    setOpenDescriptionId((prevId) => (prevId === taskId ? null : taskId));
  };

  return (
    <div className="home">
      <div className="card_container">
        <h1 className="my-2 heading text-center">TodoList</h1>

        <div className="form-group align-self-center d-flex justify-content-center w-100">
          <button
            className="btn btn-primary mx-2 w-50"
            onClick={() => setIsModelOpen(true)}
          >
            Add
          </button>
        </div>

        <div className="list">
          <ul className="list-group">
            {count.length === 0 ? (
              <li className="list-group-item">No Task</li>
            ) : (
              count.map((item, index) => (
                <ExpandableItem
                  key={item.id}
                  item={item}
                  isExpanded={openDescriptionId === item.id}
                  onToggle={toggleDescription}
                  onDelete={handledelete}
                  onToggleCheck={handleedit}
                />
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
