import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async () => {
  const response = await fetch("http://localhost:5000/api/match", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input }),
  });

  const data = await response.json();
  setResults(data.results || []);
};


  return (
    <div style={{ padding: "2rem" }}>
      <h1>TasteMatch 🔍</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter favorite food or movie"
        style={{ padding: "0.5rem", width: "300px" }}
      />
      <button onClick={handleSubmit} style={{ marginLeft: "1rem" }}>
        Find Matches
      </button>

      <div style={{ marginTop: "2rem" }}>
        {results.map((item, i) => (
          <div key={i} style={{ borderBottom: "1px solid #ccc", padding: "1rem 0" }}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
