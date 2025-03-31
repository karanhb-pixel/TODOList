import React from "react";
import PropTypes from "prop-types";
import "./ExpandableItem.css";

const ExpandableItem = ({
  item,
  isExpanded,
  onToggle,
  onDelete,
  onToggleCheck,
}) => {
  // Format the updated_at date using new Date()
  const formattedDate = new Date(item.updated_at).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Ensures 12-hour format with AM/PM
  });

  return (
    <React.Fragment>
      <li className="list-group-item list-item-main">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              className="mx-2 checkbox"
              checked={item.isChecked}
              onChange={() => onToggleCheck(item.id, item.isChecked)}
            />
            <span className={item.isChecked ? "text-muted" : ""}>
              {item.task}
            </span>
          </div>
          <div className="button-group d-flex gap-2">
            <button
              className="btn btn-danger"
              onClick={() => onDelete(item.id)}
            >
              Delete
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => onToggle(item.id)}
            >
              Details {isExpanded ? "▲" : "▼"}
            </button>
          </div>
        </div>
      </li>

      {isExpanded && (
        <li className="list-group-item list-item-expanded">
          <div className="expanded-content">
            <h6>Task Details</h6>
            <p>{item.description}</p>
            <small className="text-muted">Updated: {formattedDate}</small>
          </div>
        </li>
      )}
    </React.Fragment>
  );
};

ExpandableItem.propTypes = {
  item: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleCheck: PropTypes.func.isRequired,
};

export default ExpandableItem;
