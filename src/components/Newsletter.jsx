// src/components/Newsletter.jsx
import React, { useState } from "react";
import styles from "./Newsletter.module.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className={styles.newsletter}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Join Our Community</h2>
            <p className={styles.description}>
              Subscribe to our newsletter for farm updates, event announcements,
              and educational resources.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={`btn-primary ${styles.button}`}>
              Subscribe
            </button>
          </form>

          {subscribed && (
            <div className={styles.success}>
              Thank you for subscribing! Check your email for confirmation.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
