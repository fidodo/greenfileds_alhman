// src/components/Stats.jsx
import React from "react";
import { GiTreeRoots, GiCow, GiVillage, GiGraduateCap } from "react-icons/gi";
import styles from "./Stats.module.css";

const Stats = () => {
  const stats = [
    { icon: <GiTreeRoots />, value: "16", label: "Hectares Campus" },
    { icon: <GiGraduateCap />, value: "500+", label: "Active Students" },
    { icon: <GiCow />, value: "80+", label: "Farm Animals" },
    { icon: <GiVillage />, value: "20+", label: "Community Events" },
  ];

  return (
    <section className={styles.stats}>
      <div className="container">
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{stat.icon}</div>
              <div className={styles.value}>{stat.value}</div>
              <div className={styles.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
