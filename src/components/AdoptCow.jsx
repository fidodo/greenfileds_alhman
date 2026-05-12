// src/components/AdoptCow.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdoptCow.module.css";

const AdoptCow = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.adopt}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img src="./okei.webp" alt="Adopt a Cow" className={styles.image} />
          </div>
          <div className={styles.textContent}>
            <div className={styles.sectionLabel}>Adopt a Cow Program</div>
            <h2 className={styles.title}>Connect with Our Gentle Herd</h2>
            <p className={styles.description}>
              Our adoption program allows you to sponsor a cow and receive
              regular updates about their life on the farm. Each adoption helps
              support our animal care and educational programs.
            </p>
            <ul className={styles.benefits}>
              <li>✓ Personalized adoption certificate</li>
              <li>✓ Monthly photo and video updates</li>
              <li>✓ Invitations to farm events</li>
              <li>✓ Visit your adopted cow anytime</li>
            </ul>
            <button className="btn-primary" onClick={() => navigate("/cows")}>
              View Available Cows →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdoptCow;
