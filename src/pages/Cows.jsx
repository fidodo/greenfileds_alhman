// src/pages/Cows.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  getAvailableCows,
  adoptCow,
  getAllCows,
  deleteCow,
} from "../services/api";
import { FaTrash, FaEdit } from "react-icons/fa";
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
  const BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:1337";
  let imageUrl = "./okei.png";

  if (cow.image?.url) {
    imageUrl = cow.image.url;
  } else if (cow.image?.[0]?.url) {
    imageUrl = cow.image[0].url;
  } else if (typeof cow.image === "string") {
    imageUrl = cow.image;
  }

  // Add optimization parameters for Strapi images
  if (imageUrl.startsWith("/uploads")) {
    // Add quality=80 to reduce file size and format=webp
    const hasQuery = imageUrl.includes("?");
    const separator = hasQuery ? "&" : "?";
    // Strapi might support these params depending on your setup
    imageUrl = `${BACKEND_URL}${imageUrl}${separator}quality=80&format=webp&width=400&height=300`;
  }

  return imageUrl;
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
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    monthlyAmount: 45,
  });
  const [adoptedCowIds, setAdoptedCowIds] = useState([]);

  const loadCows = useCallback(async () => {
    try {
      setLoading(true);
      const data = isAdmin ? await getAllCows() : await getAvailableCows();

      const uniqueCows = data.reduce((acc, current) => {
        const exists = acc.find(
          (item) => item.documentId === current.documentId,
        );
        if (!exists) {
          acc.push(current);
        }
        return acc;
      }, []);

      setCows(uniqueCows);
    } catch (error) {
      console.error("Failed to load cows:", error);
      setMessage({
        type: "error",
        text: "Failed to load cows. Please refresh the page.",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    loadCows();
    const token = localStorage.getItem("adminToken");
    const savedAdopted = localStorage.getItem("adoptedCowIds");
    if (savedAdopted) {
      setAdoptedCowIds(JSON.parse(savedAdopted));
    }
    if (token) {
      setIsAdmin(true);
      setAdminToken(token);
    }
  }, [loadCows]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      // Strapi login endpoint - adjust based on your Strapi version
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (data.jwt) {
        localStorage.setItem("adminToken", data.jwt);
        localStorage.setItem("adminEmail", loginEmail);
        setIsAdmin(true);
        setAdminToken(data.jwt);
        setShowAdminLogin(false);
        setMessage({ type: "success", text: "Logged in as Admin!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
        loadCows();
      } else {
        setMessage({ type: "error", text: "Invalid credentials" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Login failed. Please try again." });
    }
  };

  // const handleAdminLogout = () => {
  //   localStorage.removeItem("adminToken");
  //   localStorage.removeItem("adminEmail");
  //   setIsAdmin(false);
  //   setAdminToken("");
  //   setLoginEmail("");
  //   setMessage({ type: "success", text: "Logged out of Admin mode" });
  //   setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  //   loadCows();
  // };

  const handleDeleteCow = async (cowId, cowName) => {
    if (window.confirm(`Are you sure you want to delete ${cowName}?`)) {
      try {
        await deleteCow(cowId, adminToken);
        setMessage({ type: "success", text: `${cowName} has been deleted!` });
        await loadCows();
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

        const newAdoptedList = [...adoptedCowIds, selectedCow.id];
        setAdoptedCowIds(newAdoptedList);
        localStorage.setItem("adoptedCowIds", JSON.stringify(newAdoptedList));

        setCows((prevCows) =>
          prevCows.map((cow) => {
            if (cow.id === selectedCow.id) {
              // Calculate new values based on CURRENT cow data
              const newCurrentAdopters = (cow.currentAdopters || 0) + 1;
              const maxAdopters = cow.maxAdopters || 25;

              return {
                ...cow,
                currentAdopters: newCurrentAdopters,
                isAvailable: newCurrentAdopters < maxAdopters,
              };
            }
            return cow;
          }),
        );

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          monthlyAmount: 45,
        });

        setSelectedCow(null);

        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
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
          <div className={styles.skeletonGrid}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.skeletonCard}>
                <div className={styles.skeletonImage}></div>
                <div className={styles.skeletonContent}>
                  <div className={styles.skeletonTitle}></div>
                  <div className={styles.skeletonText}></div>
                  <div className={styles.skeletonButton}></div>
                </div>
              </div>
            ))}
          </div>
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
                    ? "Manage Cows (Admin Mode)"
                    : "Available Cows for Adoption"}
                </h1>
                <p className={styles.subtitle}>
                  {isAdmin
                    ? "View and manage all cows in the system. Delete cows that are no longer available."
                    : "Meet our gentle herd and choose a cow to sponsor. Each adoption helps support our animal care and educational programs."}
                </p>
              </div>

              {/* Admin Toggle Button
              {!isAdmin ? (
                <button
                  className={styles.adminToggleBtn}
                  onClick={() => setShowAdminLogin(true)}
                >
                  <FaUserShield /> Admin Login
                </button>
              ) : (
                <button
                  className={styles.adminLogoutBtn}
                  onClick={handleAdminLogout}
                >
                  <FaSignOutAlt /> Logout Admin
                </button>
              )} */}
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
                    <label>Email</label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Password</label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <button type="submit" className={styles.submitBtn}>
                    Login
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
                    <picture>
                      <source
                        srcSet={getImageUrl(cow)}
                        type="image/webp"
                        onError={(e) => {
                          e.target.src = "./okei.png";
                        }}
                      />
                      <img
                        src={getImageUrl(cow)}
                        alt={cow.name}
                        className={styles.cowImage}
                        onError={(e) => {
                          e.target.src = "./okei.png";
                        }}
                      />
                    </picture>
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
                    {cow.isAvailable !== false &&
                    cow.currentAdopters < cow.maxAdopters &&
                    !adoptedCowIds.includes(cow.id) ? (
                      <button
                        className={styles.adoptBtn}
                        onClick={() => openAdoptionModal(cow)}
                      >
                        Adopt {cow.name} →
                      </button>
                    ) : (
                      <button className={styles.unavailableBtn} disabled>
                        {adoptedCowIds.includes(cow.id)
                          ? "✨ Already Adopted! ✨"
                          : "Currently Unavailable"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Adoption Modal */}
      {selectedCow && !submitting && (
        <div className={styles.modal} onClick={() => setSelectedCow(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>Adopt {selectedCow.name}</h2>
              <button
                className={styles.modalClose}
                onClick={() => setSelectedCow(null)}
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

      {/* Loading overlay for modal submission */}
      {submitting && selectedCow && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.loadingSpinner}>
              <div className={styles.spinner}></div>
              <p>Processing your adoption...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cows;
