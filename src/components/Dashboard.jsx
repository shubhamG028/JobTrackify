import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';


const Dashboard = ({ urls, setUrls }) => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    const response = await axios.get("http://localhost:5002/dashboard");
    console.log("🚀 ~ fetchUrls ~ response:", response);
    setUrls(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5002/delete/${id}`);
    fetchUrls(); // Refresh the list after deletion
  };


  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/">Go to Home</Link>
      <table>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Visits</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id}>
              <td>{url.originalUrl}</td>
              <td>
                <a
                  href={`http://localhost:5002/${url.shortUrl}`}
                >{`http://localhost:5002/${url.shortUrl}`}</a>
              </td>
              <td>{url.visits}</td>
              <td>
                <button onClick={() => handleDelete(url._id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => navigate(`/${url._id}/details`)}>
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Dashboard.propTypes = {
    urls: PropTypes.array.isRequired,
    setUrls: PropTypes.func.isRequired,
  };

export default Dashboard;
