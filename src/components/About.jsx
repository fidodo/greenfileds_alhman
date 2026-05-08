// src/components/About.jsx
import React from "react";
import { GiBarn, GiGreenhouse } from "react-icons/gi";
import { FaUsers, FaHandsHelping } from "react-icons/fa";
import styles from "./About.module.css";

const About = () => {
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

  const features = [
    {
      icon: <GiBarn />,
      title: "Modern Facilities",
      description: "State-of-the-art barns and equipment",
    },
    {
      icon: <FaUsers />,
      title: "Expert Faculty",
      description: "Experienced farmers and educators",
    },
    {
      icon: <GiGreenhouse />,
      title: "Organic Gardens",
      description: "Working vegetable and herb gardens",
    },
    {
      icon: <FaHandsHelping />,
      title: "Community Programs",
      description: "Workshops and volunteer opportunities",
    },
  ];

  return (
    <section className={styles.about}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.content}>
            <div className={styles.label}>About AlhmanEdu Playground</div>
            <h2 className={styles.title}>Cultivating Knowledge & Community</h2>
            <div className={styles.label}>About AlhmanEdu Playground</div>
            <h2 className={styles.title}>Where Play Meets Learning</h2>
            <p className={styles.text}>
              Nestled on a beautiful 16-hectare campus, AlhmanEdu Playground is
              more than just a school — it’s a vibrant community space where
              education and joyful play come together. With vast open fields,
              green meadows, and natural surroundings, our campus welcomes
              children, families, and community members to learn through
              experience, run freely, explore nature, and connect with animals.
              <br />
              <br />
              From hands-on farming and animal care to creative activities and
              unstructured outdoor play, we nurture curious minds while offering
              everyone the opportunity to enjoy fresh air and open spaces. We
              believe that the future of agriculture lies in educating the next
              generation of farmers, scientists, and community leaders who
              understand the importance of sustainable practices.
            </p>
            <button className="btn-primary" onClick={scrollToPrograms}>
              Learn More About Us →
            </button>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h4 className={styles.featureTitle}>{feature.title}</h4>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
