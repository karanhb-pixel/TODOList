import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function PopupForm({ isModelOpen, setIsModelOpen, handleAddTask }) {
  const [task, setTask] = useState(""); // Separate state for the input field
  const [description, setDescription] = useState(""); // State to manage description

  const handleadd = (e) => {
    e.preventDefault();

    if (task.trim() !== "") {
      console.log(task, description);
      handleAddTask(task, description); // Call the function to add task
      setIsModelOpen(false); // Close the modal

      setTask("");
      setDescription("");
    }
  };
  return (
    <>
      {/* <!-- Modal --> */}
      <div
        className={`modal fade ${isModelOpen ? "show" : ""}`}
        style={{ display: isModelOpen ? "block" : "none" }}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!isModelOpen}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Enter Details for List
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setIsModelOpen(false)}
              ></button>
            </div>
            {/* Adding input field and button to add task */}
            <div className="modal-body">
              <input
                type="text"
                className="form-control g-col-6 mt-2"
                placeholder="Enter your task here"
                onChange={(e) => {
                  setTask(e.target.value);
                }}
                value={task}
              />
              <input
                type="text"
                className="form-control g-col-6 mt-2"
                placeholder="Enter description here"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleadd}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopupForm;
