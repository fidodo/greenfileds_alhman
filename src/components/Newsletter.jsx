// src/components/Newsletter.jsx
import React, { useState } from "react";
import { subscribeToNewsletter } from "../services/api";
import styles from "./Newsletter.module.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const result = await subscribeToNewsletter(email);
      setStatus({
        type: "success",
        message: result.message || "Thank you for subscribing!",
      });
      setEmail("");
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.newsletter} id="contact">
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
            <button
              type="submit"
              disabled={loading}
              className={`btn-primary ${styles.button}`}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {status.message && (
            <div
              className={
                status.type === "success" ? styles.success : styles.error
              }
            >
              {status.message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
