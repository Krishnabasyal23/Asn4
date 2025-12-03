import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("");
  const handleSearch = async () => {
    if (!name) {
      setError("Please enter a character name");
      return;
    }

    // Clear previous state
    setError("");
    setImageUrl(null);
    // build request url
    const url = `http://localhost:3001/api/getImage?name=${name}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        setError("Image not found");
        return;
      }
      const blob = await response.blob();
      const imgUrl = URL.createObjectURL(blob);
      setImageUrl(imgUrl);
    } catch (err) {
      setError("Server error");
    }
  };
  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1> Image Search </h1>
      <input
        type="text"
        placeholder="Enter name ( tom, jerry, dog)"
        value={name}

        onChange={(e) => setName(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />

      <button onClick={handleSearch} style={{ padding: "8px 16px" }}>Search</button>
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>
          <img src={imageUrl} alt="Character" width='250' />
        </div>
      )}
    </div>
  );
}
export default App;
