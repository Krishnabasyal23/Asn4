import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [imageUrl, setImalgeUrl] = useSate(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!name) {
      setError("Please enter a character name");
      return;
    }

    // Clear previous state
    setError("");
    setImalgeUrl(null);
    // build request url
    const url = `http://localhost:3001/api/getImage?name=${name}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        setError("Image not found");
        return;
      }
      const blob = await response.blob();
      const imgUrl = url.createObjectURL(blob);
      setImalgeUrl(imgURL);
    } catch (err) {
      setError("Server error");
    }
  };
  return (

)