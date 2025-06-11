import React, { useState } from "react";
import './TaskList.css';

export default function TaskList({ tasks, onUpdate, onDelete }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedPriority, setEditedPriority] = useState("Medium");

  const handleEdit = (task, index) => {
    setEditIndex(index);
    setEditedName(task.name);
    setEditedPriority(task.priority);
  };

  const handleSave = (index) => {
    const updatedTask = {
      ...tasks[index],
      name: editedName.trim(),
      priority: editedPriority,
    };
    onUpdate(updatedTask, index);
    setEditIndex(null);
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "High":
        return "🔥";
      case "Medium":
        return "⚡";
      case "Low":
        return "🌱";
      default:
        return "🔰";
    }
  };

  return (
    <div className="tasklist-container">
      <h2 className="tasklist-title">Task List</h2>
      {tasks.length === 0 && <p className="tasklist-empty">No tasks found.</p>}
      {tasks.map((task, index) => {
        const isEditing = index === editIndex;
        const isUrgent = task.name.toLowerCase().includes("urgent");
        const highlight = task.actions?.includes("highlightRed") || isUrgent;

        return (
          <div
            key={index}
            className={`tasklist-taskbox${highlight ? " tasklist-taskbox-urgent" : ""}`}
          >
            {isEditing ? (
              <div className="tasklist-edit-row">
                <input
                  className="tasklist-input"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <select
                  className="tasklist-select"
                  value={editedPriority}
                  onChange={(e) => setEditedPriority(e.target.value)}
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <button className="tasklist-btn" onClick={() => handleSave(index)}>Save</button>
                <button className="tasklist-btn tasklist-btn-cancel" onClick={() => setEditIndex(null)}>Cancel</button>
              </div>
            ) : (
              <div className="tasklist-view-row">
                <strong className={`tasklist-taskname${isUrgent ? " tasklist-taskname-urgent" : ""}`}>
                  {task.name}
                </strong>
                <span className="tasklist-priority">
                  ({getPriorityIcon(task.priority)} {task.priority})
                </span>
                <button
                  className="tasklist-btn"
                  onClick={() => handleEdit(task, index)}
                >
                  Edit
                </button>
                <button
                  className="tasklist-btn tasklist-btn-delete"
                  onClick={() => onDelete(index)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
