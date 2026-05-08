// src/components/Hero.jsx
import React from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  const heroStyle = {
    backgroundImage: 'url("/Ahlmannoverview.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  };
  const scrollToPrograms = () => {
    const programsSection = document.getElementById("programs");
    if (programsSection) {
      const offsetTop = programsSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  const scrollToAdopt = () => {
    const adoptSection = document.getElementById("adopt");
    if (adoptSection) {
      const offsetTop = adoptSection.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const offsetTop = contactSection.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.hero} style={heroStyle}>
      <div className={styles.overlay}></div>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.badge}>AHLMAN EDU's PLAYGROUND</div>
          <h1 className={styles.title}>
            16 Hectares of{" "}
            <span className={styles.highlight}>
              Open Spaces. Real Experiences
            </span>
          </h1>
          <h2 className={styles.subtitle}>Where Education Meets Agriculture</h2>
          <p className={styles.description}>
            Step into 16 hectares of beautiful open land designed for play,
            exploration, and connection. From free play in the fields with
            animal interactions and seasonal activities — everyone is welcome to
            enjoy our Green Fields
          </p>
          <div className={styles.buttons}>
            <button className="btn-primary" onClick={scrollToAdopt}>
              Adopt a Cow
            </button>
            <button className="btn-outline" onClick={scrollToContact}>
              Join Community
            </button>
          </div>

          <div className={styles.scrollIndicator} onClick={scrollToPrograms}>
            <span>Scroll to explore</span>
            <div className={styles.scrollArrow}>↓</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
