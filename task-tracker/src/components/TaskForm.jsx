
import React, { useState } from "react";

const priorities = ["High", "Medium", "Low"];

export default function TaskForm({ onAddTask }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (name.trim() === "") {
      setError("Task name cannot be empty.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = () => {
    const newTask = {
      name: name.trim(),
      priority,
      createdAt: new Date().toISOString(),
    };
    onAddTask(newTask);
    setName("");
    setPriority("Medium");
    setStep(1);
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h2>Add Task</h2>
      {step === 1 && (
        <div>
          <input
            type="text"
            placeholder="Enter task name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleNext}>Next</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
      {step === 2 && (
        <div>
          <label>Select Priority: </label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            {priorities.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <button onClick={handleSubmit}>Add Task</button>
          <button onClick={() => setStep(1)} style={{ marginLeft: "8px" }}>
            Back
          </button>
        </div>
      )}
    </div>
  );
}
