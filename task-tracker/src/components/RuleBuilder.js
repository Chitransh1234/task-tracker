import React, { useState } from "react";

const fields = [
  { value: "name", label: "Task Name" },
  { value: "priority", label: "Priority" },
  // Add more fields as needed
];

const conditions = [
  { value: "contains", label: "contains" },
  { value: "equals", label: "equals" },
  // Add more conditions as needed
];

const actions = [
  { value: "highlightRed", label: "Highlight Red" },
  { value: "hide", label: "Hide Task" },
  { value: "sortToTop", label: "Move to Top" },
  { value: "warnIfTooMany", label: "Warn if too many" },
  // Add more actions as needed
];

function RuleBuilder({ rules, setRules }) {
  const [field, setField] = useState(fields[0].value);
  const [condition, setCondition] = useState(conditions[0].value);
  const [value, setValue] = useState("");
  const [action, setAction] = useState(actions[0].value);

  const handleAddRule = () => {
    if (!value) return;
    setRules([
      ...rules,
      { field, condition, value, action }
    ]);
    setValue("");
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Rule Builder</h3>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <select value={field} onChange={e => setField(e.target.value)}>
          {fields.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
        </select>
        <select value={condition} onChange={e => setCondition(e.target.value)}>
          {conditions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <select value={action} onChange={e => setAction(e.target.value)}>
          {actions.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
        </select>
        <button onClick={handleAddRule}>Add Rule</button>
      </div>
      <ul>
        {rules.map((rule, idx) => (
          <li key={idx}>
            If <b>{rule.field}</b> <b>{rule.condition}</b> <b>{rule.value}</b>, then <b>{rule.action}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RuleBuilder;