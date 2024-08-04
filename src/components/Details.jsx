import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Details = ({ urls }) => {
  const { id } = useParams();

  const urlArr = urls.filter((item) => item._id === id);
  const url = urlArr[0];

  //   useEffect(() => {
  //     const fetchUrls = async () => {
  //       const response = await axios.get(`${BASE_URL}/dashboard`);
  //       console.log("🚀 ~ fetchUrls ~ response:", response);
  //       setUrls(response.data);
  //     };
  //     fetchUrls();
  //   }, []);

  return (
    <div>
      <hr></hr>
      <Link to="/">Go to Home</Link>
      <h2>Original URL: {url.originalUrl}</h2>
      <h3>
        Short URL:
        <a
          href={`${BASE_URL}/${url.shortUrl}`}
        >{`${BASE_URL}/${url.shortUrl}`}</a>
      </h3>
      <h4>Visits: {url.visits}</h4>
      {/* <button onClick={() => handleDelete(url._id)}>Delete</button> */}
      <table>
        <thead>
          <tr>
            <th>IP Address</th>
            <th>User Agent</th>
            <th>Device Type</th>
            <th>Operating System</th>
            <th>Browser</th>
            <th>Location</th>
            <th>Referrer</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {url.visitDetails.map((visit, index) => (
            <tr key={index}>
              <td>{visit.ipAddress}</td>
              <td>{visit.userAgent}</td>
              <td>{visit.deviceType}</td>
              <td>{visit.operatingSystem}</td>
              <td>{visit.browser}</td>
              <td>{`${visit.location.city}, ${visit.location.region}, ${visit.location.country}`}</td>
              <td>{visit.referrer}</td>
              <td>{new Date(visit.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Details.propTypes = {
  urls: PropTypes.array.isRequired,
};

export default Details;
