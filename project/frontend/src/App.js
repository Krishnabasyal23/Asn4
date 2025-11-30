import { useState } from "react";
import { uploadImage } from "./uploadApi";
function App() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("");
  const [uploadName, setUploadName] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

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
  const handleUpload = async () => {
    if (!uploadName || !uploadFile) {
      setUploadMessage("Please enter name and select file");
      return;
    }
    const formData = new FormData();
    FormData.append("image", uploadFile);
    try {
      const response = await fetch(
        `http://localhost:3001/api/upload?name=${uploadName}`,
        { method: "POST", body: formData }
      );
      if (!response.ok) {
        setUploadMessage("Upload Failed");
        return;
      }
      setUploadMessage("Upload successful! Try searching again.");
    }catch (err){
      setUploadMessage("Server error during upload. ")
    }
  };
  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <div style={{ marginBottom: "40px" }}>
        <h2>Upload Image</h2>
        <input
          type="Text"
          placeholder="Enter name to save image"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8 px", marginRight: "10px" }}
        />
        <input
          type="file"
          id="uploadFile"
          style={{ marginRight: "10px" }}
        />
        <button
          onClick={async () => {
            const fileInput = document.getElementById("uploadFile");
            const file = fileInput.files[0];
            if (!name || !file) {
              setError("Enter name and choose a file first");
              return;
            }
            setError("");
            const res = await uploadImage(name, file);
            if (res.error) setError(res.error);
            else alert("Uploaded successfully!");
          }}
          style={{ padding: "8px 16px" }}
        >
          Upload
        </button>
      </div>
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
