// src/pages/ViewSubscribers.jsx (temporary)
import React, { useState, useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:1337/api";

const ViewSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/newsletter-subscribers?publicationState=preview`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Subscribers:", data);
        setSubscribers(data.data || []);
      });
  }, []);

  return (
    <div>
      <h2>Newsletter Subscribers ({subscribers.length})</h2>
      <ul>
        {subscribers.map((sub) => (
          <li key={sub.id}>{sub.attributes?.email || sub.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewSubscribers;
