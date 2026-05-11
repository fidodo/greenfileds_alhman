// src/pages/Cows.jsx
import React, { useState, useEffect } from "react";
import {
  getAvailableCows,
  adoptCow,
  getAllCows,
  deleteCow,
} from "../services/api";
import { FaTrash, FaEdit, FaUserShield } from "react-icons/fa";

import styles from "./Cows.module.css";

// Helper function to extract plain text from Strapi Rich Text
const parseRichText = (richText) => {
  if (!richText) return "";
  if (typeof richText === "string") return richText;
  if (Array.isArray(richText)) {
    return richText
      .map((block) => {
        if (block.children && Array.isArray(block.children)) {
          return block.children.map((child) => child.text || "").join("");
        }
        return "";
      })
      .join(" ");
  }
  return String(richText);
};

const getImageUrl = (cow) => {
  const BACKEND_URL = "http://localhost:1337"; // Your Strapi URL

  // Try different possible image paths
  if (cow.image?.url) {
    if (cow.image.url.startsWith("/uploads")) {
      return `${BACKEND_URL}${cow.image.url}`;
    }
    return cow.image.url;
  }

  if (cow.image?.[0]?.url) {
    if (cow.image[0].url.startsWith("/uploads")) {
      return `${BACKEND_URL}${cow.image[0].url}`;
    }
    return cow.image[0].url;
  }

  // Check if image is stored as a string
  if (typeof cow.image === "string") {
    if (cow.image.startsWith("/uploads")) {
      return `${BACKEND_URL}${cow.image}`;
    }
    return cow.image;
  }

  return "./okei.png";
};

const Cows = () => {
  const [cows, setCows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCow, setSelectedCow] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    monthlyAmount: 45,
  });

  useEffect(() => {
    loadCows();
    // Check if admin token exists in localStorage
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAdmin(true);
      setAdminToken(token);
    }
  }, []);

  const loadCows = async () => {
    try {
      // If admin, load all cows including unavailable ones
      const data = isAdmin ? await getAllCows() : await getAvailableCows();
      // Remove duplicates by documentId (this prevents showing same cow twice)
      const uniqueCows = data.reduce((acc, current) => {
        const x = acc.find((item) => item.documentId === current.documentId);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      setCows(uniqueCows);
    } catch (error) {
      console.error("Failed to load cows:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const token = document.getElementById("adminToken").value;
    if (token) {
      localStorage.setItem("adminToken", token);
      setIsAdmin(true);
      setAdminToken(token);
      setShowAdminLogin(false);
      loadCows();
    }
  };

  const handleDeleteCow = async (cowId, cowName) => {
    if (window.confirm(`Are you sure you want to delete ${cowName}?`)) {
      try {
        await deleteCow(cowId, adminToken);
        setMessage({ type: "success", text: `${cowName} has been deleted!` });
        loadCows(); // Refresh the list
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } catch (error) {
        setMessage({
          type: "error",
          text: "Failed to delete cow. Make sure you have admin permissions.",
        });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      }
    }
  };

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await adoptCow({
        cowId: selectedCow.id,
        ...formData,
      });

      if (result.success) {
        setMessage({ type: "success", text: result.message });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          monthlyAmount: 45,
        });
        setTimeout(() => {
          setSelectedCow(null);
          setMessage({ type: "", text: "" });
          loadCows();
        }, 3000);
      } else {
        setMessage({ type: "error", text: result.error || "Adoption failed" });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Something went wrong",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const openAdoptionModal = (cow) => {
    setSelectedCow(cow);
    setMessage({ type: "", text: "" });
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      monthlyAmount: cow.monthlyCost || 45,
    });
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="container">
          <h2>Loading our lovely cows...</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className={styles.cowsPage}>
        <div className="container">
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <div>
                <h1 className={styles.title}>
                  {isAdmin
                    ? "Manage Cows (Admin)"
                    : "Available Cows for Adoption"}
                </h1>
                <p className={styles.subtitle}>
                  {isAdmin
                    ? "View and manage all cows in the system. Delete cows that are no longer available."
                    : "Meet our gentle herd and choose a cow to sponsor. Each adoption helps support our animal care and educational programs."}
                </p>
              </div>
              {!isAdmin && (
                <button
                  className={styles.adminToggleBtn}
                  onClick={() => setShowAdminLogin(true)}
                >
                  <FaUserShield /> Admin
                </button>
              )}
            </div>
          </div>

          {/* Admin Login Modal */}
          {showAdminLogin && (
            <div
              className={styles.modal}
              onClick={() => setShowAdminLogin(false)}
            >
              <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <h2>Admin Login</h2>
                  <button
                    className={styles.modalClose}
                    onClick={() => setShowAdminLogin(false)}
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleAdminLogin} className={styles.adoptForm}>
                  <div className={styles.formGroup}>
                    <label>API Token</label>
                    <input
                      id="adminToken"
                      type="password"
                      placeholder="Enter your Strapi API token"
                      required
                    />
                    <small>
                      Get your token from Strapi Admin → Settings → API Tokens
                    </small>
                  </div>
                  <button type="submit" className={styles.submitBtn}>
                    Login as Admin
                  </button>
                </form>
              </div>
            </div>
          )}

          {message.text && (
            <div
              className={
                message.type === "success"
                  ? styles.successMessage
                  : styles.errorMessage
              }
            >
              {message.text}
            </div>
          )}

          {cows.length === 0 ? (
            <div className={styles.noCows}>
              <h2>Check back soon for available cows!</h2>
              <p>New cows will be available for adoption shortly.</p>
              <button
                className="btn-primary"
                onClick={() => (window.location.href = "/")}
              >
                Back to Home
              </button>
            </div>
          ) : (
            <div className={styles.cowsGrid}>
              {cows.map((cow) => (
                <div key={cow.documentId || cow.id} className={styles.cowCard}>
                  <div className={styles.cowImageContainer}>
                    <img
                      src={getImageUrl(cow)}
                      alt={cow.name}
                      className={styles.cowImage}
                    />
                    <div className={styles.adoptionStatus}>
                      {cow.currentAdopters || 0} / {cow.maxAdopters || 25}{" "}
                      Adoptions
                    </div>
                    {isAdmin && (
                      <div className={styles.adminActions}>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDeleteCow(cow.id, cow.name)}
                        >
                          <FaTrash /> Delete
                        </button>
                        <button className={styles.editBtn}>
                          <FaEdit /> Edit
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={styles.cowInfo}>
                    <h3 className={styles.cowName}>{cow.name}</h3>
                    <p className={styles.cowBreed}>
                      {cow.breed || "Mixed Breed"}
                    </p>
                    <p className={styles.cowDescription}>
                      {parseRichText(cow.description)}
                    </p>
                    <div className={styles.cowStats}>
                      <span>Age: {cow.age || "Unknown"} years</span>
                      <span>Monthly: €{cow.monthlyCost || 45}</span>
                    </div>
                    {cow.isAvailable !== false ? (
                      <button
                        className={styles.adoptBtn}
                        onClick={() => openAdoptionModal(cow)}
                      >
                        Adopt {cow.name} →
                      </button>
                    ) : (
                      <button className={styles.unavailableBtn} disabled>
                        Currently Unavailable
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Adoption Modal (same as before) */}
      {selectedCow && (
        <div
          className={styles.modal}
          onClick={() => !submitting && setSelectedCow(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>Adopt {selectedCow.name}</h2>
              <button
                className={styles.modalClose}
                onClick={() => setSelectedCow(null)}
                disabled={submitting}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAdoptSubmit} className={styles.adoptForm}>
              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+1234567890"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Message (Optional)</label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us why you'd like to adopt this cow..."
                />
              </div>

              <div className={styles.formGroup}>
                <label>Monthly Sponsorship Amount (€)</label>
                <input
                  type="number"
                  min="10"
                  value={formData.monthlyAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      monthlyAmount: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={submitting}
              >
                {submitting ? "Processing..." : "Complete Adoption"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Cows;
