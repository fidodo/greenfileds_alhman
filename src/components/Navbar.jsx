// src/components/Navbar.jsx
import {
  GiHamburgerMenu,
  GiCancel,
  GiHomeGarage,
  GiTalk,
  GiFarmer,
  GiCow,
  GiPhone,
  GiCalendar,
} from "react-icons/gi";
// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = [
        "home",
        "programs",
        "playground",
        "farm-life",
        "adopt",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: "home", label: "Home", icon: <GiHomeGarage size={20} /> },

    { id: "farm-life", label: "Farm Life", icon: <GiFarmer size={20} /> },
    { id: "adopt", label: "Adopt", icon: <GiCow size={20} /> },

    { id: "events", label: "Events", icon: <GiCalendar size={20} /> },
    { id: "feedback", label: "Feedback", icon: <GiTalk size={20} /> },
    { id: "contact", label: "Contact", icon: <GiPhone size={20} /> },
  ];

  const navbarClasses = `${styles.navbar} ${scrolled ? styles.scrolled : ""}`;

  return (
    <>
      {/* Desktop & Mobile Top Navigation */}
      <nav className={navbarClasses}>
        <div className={styles.container}>
          <div className={styles.logo} onClick={() => scrollToSection("home")}>
            <button
              style={{
                cursor: "pointer",
                borderRadius: "4px",
                padding: "4px 8px",
              }}
            >
              <span className={styles.logoMain}>AhlmanEdu</span>
              <span className={styles.logoSub}>GreenFields</span>
            </button>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className={styles.desktopNav}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`${styles.navLink} ${activeSection === link.id ? styles.active : ""}`}
              >
                {link.label}
              </button>
            ))}
            <button
              className={`btn-primary ${styles.navBtn}`}
              onClick={() => scrollToSection("contact")}
            >
              Join Community
            </button>
          </div>

          {/* Mobile Menu Button (only visible on mobile) */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <GiHamburgerMenu size={24} />
          </button>
        </div>
      </nav>

      {/* Bottom Navigation Bar - ALWAYS VISIBLE ON MOBILE */}
      <div className={styles.bottomNav}>
        <div className={styles.bottomNavContainer}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`${styles.bottomNavItem} ${activeSection === link.id ? styles.bottomActive : ""}`}
            >
              <span className={styles.bottomNavIcon}>{link.icon}</span>
              <span className={styles.bottomNavLabel}>{link.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Panel (slides up from bottom when hamburger clicked) */}
      <div
        className={`${styles.mobilePanel} ${mobileMenuOpen ? styles.panelOpen : ""}`}
      >
        <div
          className={styles.panelOverlay}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        <div className={styles.panelContent}>
          <div className={styles.panelHeader}>
            <div className={styles.panelLogo}>
              <span className={styles.panelLogoMain}>AlhmanEdu</span>
              <span className={styles.panelLogoSub}>GreenFields</span>
            </div>
            <button
              className={styles.panelCloseBtn}
              onClick={() => setMobileMenuOpen(false)}
            >
              <GiCancel size={24} />
            </button>
          </div>

          <div className={styles.panelLinks}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`${styles.panelLink} ${activeSection === link.id ? styles.panelActive : ""}`}
              >
                <span className={styles.panelLinkIcon}>{link.icon}</span>
                <span className={styles.panelLinkLabel}>{link.label}</span>
              </button>
            ))}
            <button
              className={`btn-primary ${styles.panelJoinBtn}`}
              onClick={() => scrollToSection("contact")}
            >
              Join Community
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
