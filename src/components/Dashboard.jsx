import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const Dashboard = ({ urls, setUrls }) => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    const response = await axios.get(`${BASE_URL}/dashboard`);
    setUrls(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/delete/${id}`);
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
                  href={`${BASE_URL}/${url.shortUrl}`}
                >{`${BASE_URL}/${url.shortUrl}`}</a>
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
