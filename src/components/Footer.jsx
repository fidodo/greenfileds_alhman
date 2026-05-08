// src/components/Footer.jsx
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.section}>
            <h3 className={styles.logo}>AlhmanEdu GreenFields</h3>
            <p className={styles.description}>
              Where education and joyful play come together.
            </p>
            <div className={styles.socialLinks}>
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.heading}>Quick Links</h4>
            <ul className={styles.links}>
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className={styles.linkBtn}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("programs")}
                  className={styles.linkBtn}
                >
                  Upcoming Workshops & Festivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("adopt")}
                  className={styles.linkBtn}
                >
                  Adopt a Cow
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className={styles.linkBtn}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.heading}>Contact</h4>
            <address className={styles.address}>
              AlhmanEdu GreenFields, Hallilantie 24 33820 TAMPERE, Finland
              <br />
              ahlman@ahlman.fi sales@ahlman.fi
            </address>
          </div>

          <div className={styles.section}>
            <h4 className={styles.heading}>Hours</h4>
            <p>Monday - Friday: 9am - 5pm</p>
            <p>Weekends: Closed</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {new Date().getFullYear()} AlhmanEdu GreenFields. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
