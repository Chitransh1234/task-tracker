import React from "react";

export default function SearchBar({ query, setQuery }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tasks..."
        style={{ padding: "8px", width: "60%", fontSize: "1rem" }}
      />
    </div>
  );
}
