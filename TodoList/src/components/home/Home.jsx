import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import Popupform from "../popupForm/PopupForm";
import ExpandableItem from "../expandableItem/ExpandableItem";
import { useAuth } from "../AuthContext";
import config from "../../config";

function Home() {
  const [count, setCount] = useState([]); // Initialize as an empty array
  const [isModelOpen, setIsModelOpen] = useState(false); // State to manage modal visibility
  const [openDescriptionId, setOpenDescriptionId] = useState(null); // State to manage which task's description is open
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!authToken) {
          alert("You are not Logged in!");
          return;
        }

        // Fetch tasks from the server when the component mounts
        const response = await axios.get(`${config.BASE_URL}/tasks`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        setCount(response.data); // Set the tasks in the state
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

  const handleAddTask = async (task, description) => {
    try {
      if (!authToken) {
        alert("You are not Logged in!");
      }
      const response = await axios.post(
        `${config.BASE_URL}/tasks`,
        { task, description },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      setCount([
        ...count,
        { id: response.data.id, task, description, isChecked: false },
      ]); // Add the new task to the array
    } catch (error) {
      console.error("Error adding task:", error); // Handle error response
    }
  };

  const handledelete = async (taskId) => {
    try {
      if (!authToken) {
        alert("You are not Logged in!");
      }
      const response = await axios.delete(
        `${config.BASE_URL}/tasks/${taskId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setCount(count.filter((item) => item.id !== taskId)); // remove task from the array
    } catch (error) {
      console.error("Error deleting task:", error); // Handle error response
    }
  };

  const handleedit = async (taskId, isChecked) => {
    try {
      if (!authToken) {
        alert("You are not Logged in!");
        return;
      }
      setCount(
        count.map((item) =>
          item.id === taskId ? { ...item, isChecked: !item.isChecked } : item
        )
      );

      const response = await axios.put(
        `${config.BASE_URL}/tasks/isChecked/${taskId}`,
        {
          isChecked: !isChecked,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "An error occurred while updating the task.";
      alert(errorMessage); // Display a meaningful error message
      // Revert the change if the query fails
      setCount(
        count.map((item) =>
          item.id === taskId ? { ...item, isChecked: isChecked } : item
        )
      );
    }
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
