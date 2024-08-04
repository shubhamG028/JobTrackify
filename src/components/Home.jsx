import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    console.log("🚀 ~ handleSubmit clicked!");
    e.preventDefault();
    if (!originalUrl) {
      return;
    }
    const response = await axios.post("http://localhost:5002/shorten", {
      originalUrl,
    });
    setShortUrl(`http://localhost:5002/${response.data.shortUrl}`);
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
