import React, { useState, useEffect } from "react";
import "./Footer.css";


const Footer = () => {
  const [version, setVersion] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3001/api/version")
    .then(resp => resp.json())
    .then(json => setVersion(json.version))
  }, []);
  return (
    <footer className="foot">
      <span className="footText">API Version: {version}</span>
    </footer>
  );
};

export default Footer;
