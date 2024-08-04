import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Details from "./components/Details";

function App() {
  const [urls, setUrls] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route
          path="/dashboard"
          element={<Dashboard urls={urls} setUrls={setUrls} />}
        />
        <Route path="/:id/details" element={<Details urls={urls} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
