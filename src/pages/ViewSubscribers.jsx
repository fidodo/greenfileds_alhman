// src/pages/ViewSubscribers.jsx (temporary)
import React, { useState, useEffect } from "react";

const ViewSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost:1337/api/newsletter-subscribers?publicationState=preview",
    )
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
