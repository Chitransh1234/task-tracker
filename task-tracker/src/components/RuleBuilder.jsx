import React, { useState } from "react";

const fields = ["name", "priority"];
const conditions = ["contains", "equals"];
const actions = ["highlightRed", "hide", "warnIfTooMany", "sortToTop"];

export default function RuleBuilder({ rules, setRules }) {
  const [field, setField] = useState("name");
  const [condition, setCondition] = useState("contains");
  const [value, setValue] = useState("");
  const [action, setAction] = useState("highlightRed");

  const addRule = () => {
    const newRule = { field, condition, value, action };
    setRules([...rules, newRule]);
    setValue("");
  };

  const deleteRule = (index) => {
    const updated = [...rules];
    updated.splice(index, 1);
    setRules(updated);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Rule Builder</h2>
      <div>
        <select value={field} onChange={(e) => setField(e.target.value)}>
          {fields.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
        <select value={condition} onChange={(e) => setCondition(e.target.value)}>
          {conditions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
        <select value={action} onChange={(e) => setAction(e.target.value)}>
          {actions.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        <button onClick={addRule}>Add Rule</button>
      </div>

      {rules.length > 0 && (
        <ul style={{ marginTop: "1rem" }}>
          {rules.map((r, i) => (
            <li key={i}>
              <strong>{r.field}</strong> {r.condition} <em>"{r.value}"</em> → {r.action}
              <button onClick={() => deleteRule(i)} style={{ marginLeft: "8px" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
