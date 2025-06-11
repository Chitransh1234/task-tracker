import React, { useState } from "react";

export default function TaskList({ tasks, onDelete, onUpdate }) {
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

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 && <p>No tasks found.</p>}
      {tasks.map((task, index) => {
        const isEditing = index === editIndex;
        const style = {
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "8px",
          backgroundColor:
            task.actions?.includes("highlightRed") ? "#ffdddd" : "#fff",
        };

        return (
          <div key={index} style={style}>
            {isEditing ? (
              <>
                <input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <select
                  value={editedPriority}
                  onChange={(e) => setEditedPriority(e.target.value)}
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <button onClick={() => handleSave(index)}>Save</button>
                <button onClick={() => setEditIndex(null)}>Cancel</button>
              </>
            ) : (
              <>
                <strong>{task.name}</strong> ({task.priority})
                <button onClick={() => handleEdit(task, index)} style={{ marginLeft: 8 }}>Edit</button>
                <button onClick={() => onDelete(index)} style={{ marginLeft: 8 }}>Delete</button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
