// src/components/FarmLife.jsx
import React from "react";
import { GiGardeningShears, GiPlantsAndAnimals, GiWalk } from "react-icons/gi";
import { FaCalendarAlt } from "react-icons/fa";
import styles from "./FarmLife.module.css";

const FarmLife = () => {
  const activities = [
    {
      icon: <GiWalk />,
      title: "Nature Escape",
      description: "Enjoy peaceful walks, fresh air, and outdoor moments",
    },
    {
      icon: <GiGardeningShears />,
      title: "Hands-on Classes",
      description: "Gardening, carpentry, cooking",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Seasonal Events",
      description: "Harvest festivals, plant sales",
    },
    {
      icon: <GiPlantsAndAnimals />,
      title: "Animal Care",
      description:
        "Observe how cows live and interact with them in a safe environment",
    },
  ];

  return (
    <section className={styles.farmLife}>
      <div className="container">
        <div className={styles.sectionLabel}>Farm Life</div>
        <h2 className="section-title">Daily Experiences on the Farm</h2>

        <div className={styles.grid}>
          {activities.map((activity, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{activity.icon}</div>
              <h3 className={styles.title}>{activity.title}</h3>
              <p className={styles.description}>{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FarmLife;
