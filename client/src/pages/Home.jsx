import React, { useState } from 'react';
import { getRecommendations } from '../api/recommend';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await getRecommendations(input, 'food');
    setResult(data);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <input className="border p-2 mr-2" placeholder="Describe your vibe..." onChange={(e) => setInput(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2">Get Recommendations</button>
      </form>
      {result && (
        <div className="mt-4">
          <h2 className="font-bold">LLM says:</h2>
          <p>{result.message}</p>
          <h2 className="font-bold mt-2">Qloo Suggestions:</h2>
          <ul>{result.recommendations?.map((r, i) => <li key={i}>{r.name}</li>)}</ul>
        </div>
      )}
    </div>
  );
}
