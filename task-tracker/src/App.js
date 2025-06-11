import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import RuleBuilder from "./components/RuleBuilder";
import { evaluateRules } from "./utils/ruleEngine";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [rules, setRules] = useState([]);
  // const [warnings, setWarnings] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedRules = JSON.parse(localStorage.getItem("rules")) || [];
    setTasks(savedTasks);
    setRules(savedRules);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("rules", JSON.stringify(rules));
  }, [rules]);

  // Apply rules and generate warnings
  const applyRules = () => {
    const updatedWarnings = [];
    const updatedTasks = tasks.map((task) => {
      const actions = evaluateRules(task, rules);
      return { ...task, actions };
    });

    const highPriorityCount = updatedTasks.filter(
      (t) => t.priority === "High"
    ).length;
    const hasWarnRule = rules.some((r) => r.action === "warnIfTooMany");

    if (hasWarnRule && highPriorityCount > 3) {
      updatedWarnings.push("You have more than 3 High Priority tasks!");
    }

    return { updatedTasks, updatedWarnings };
  };

  const { updatedTasks, updatedWarnings } = applyRules();
  const filteredTasks = updatedTasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.actions?.includes("sortToTop") && !b.actions?.includes("sortToTop")) {
      return -1;
    }
    if (!a.actions?.includes("sortToTop") && b.actions?.includes("sortToTop")) {
      return 1;
    }
    return 0;
  });

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (index) => {
    const copy = [...tasks];
    copy.splice(index, 1);
    setTasks(copy);
  };

  const handleUpdateTask = (updatedTask, index) => {
    const copy = [...tasks];
    copy[index] = updatedTask;
    setTasks(copy);
  };

  return (
    <div className="App" style={{ padding: "1rem", fontFamily: "Arial" }}>
      <h1>📝 Task Tracker</h1>

      {updatedWarnings.length > 0 && (
        <div style={{ background: "#ffebcc", padding: "10px", marginBottom: "1rem", color: "#b05a00" }}>
          <strong>Warning:</strong> {updatedWarnings.join(", ")}
        </div>
      )}

      <SearchBar query={searchQuery} setQuery={setSearchQuery} />
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={sortedTasks}
        onDelete={handleDeleteTask}
        onUpdate={handleUpdateTask}
      />
      <RuleBuilder rules={rules} setRules={setRules} />
    </div>
  );
}

export default App;
