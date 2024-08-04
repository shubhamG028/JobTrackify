import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    console.log("🚀 ~ handleSubmit clicked!");
    e.preventDefault();
    if (!originalUrl) {
      return;
    }
    const response = await axios.post(`${BASE_URL}/shorten`, {
      originalUrl,
    });
    setShortUrl(`${BASE_URL}/${response.data.shortUrl}`);
  };

  return (
    <div>
      <h1>JobTrackify</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <div>
          <h2>Short URL:</h2>
          <a href={shortUrl}>{shortUrl}</a>
        </div>
      )}

      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
};

export default Home;
