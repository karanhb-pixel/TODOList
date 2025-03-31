import React from "react";
import PropTypes from "prop-types";
import "./Dropdown.css";

const Dropdown = ({
  taskId,
  isOpen,
  description,
  createdDate,
  onToggle,
  onClose,
}) => {
  return (
    <div className="dropdown-container">
      <button
        className="btn btn-secondary"
        onClick={() => onToggle(taskId)}
        aria-expanded={isOpen}
      >
        Details {isOpen ? "▲" : "▼"}
      </button>

      {isOpen && (
        <div className="dropdown-panel">
          <div className="dropdown-content">
            <h6>Task Details</h6>
            <p>{description}</p>
            <small className="text-muted">
              Created: {new Date(createdDate).toLocaleDateString()}
            </small>
            <button
              className="close-button"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  description: PropTypes.string,
  createdDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onToggle: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Dropdown;
