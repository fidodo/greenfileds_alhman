// src/components/FeedbackForm.jsx
import React, { useState } from "react";
import {
  FaStar,
  FaUser,
  FaEnvelope,
  FaComment,
  FaSmile,
  FaFrown,
  FaMeh,
} from "react-icons/fa";
import styles from "./FeedbackForm.module.css";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    experience: "",
    suggestions: "",
    wouldRecommend: "yes",
  });

  const [submitted, setSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the data to your backend
    console.log("Feedback submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    // Reset form
    setFormData({
      name: "",
      email: "",
      rating: 0,
      experience: "",
      suggestions: "",
      wouldRecommend: "yes",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const setRating = (rating) => {
    setFormData({ ...formData, rating });
  };

  return (
    <section className={styles.feedback}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.sectionLabel}>Share Your Experience</div>
          <h2 className="section-title">We Value Your Feedback</h2>
          <p className={styles.description}>
            Your thoughts help us grow and improve. Share your experience at
            GreenFields Farm.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Form Section */}
          <div className={styles.formContainer}>
            {submitted && (
              <div className={styles.successMessage}>
                <FaSmile size={24} />
                <h3>Thank You!</h3>
                <p>Your feedback has been submitted successfully.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">
                  <FaUser className={styles.inputIcon} />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">
                  <FaEnvelope className={styles.inputIcon} />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Your Rating *</label>
                <div className={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={styles.starBtn}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <FaStar
                        className={`${styles.star} ${
                          star <= (hoverRating || formData.rating)
                            ? styles.starActive
                            : ""
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className={styles.ratingLabels}>
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Very Good</span>
                  <span>Excellent</span>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="experience">
                  <FaComment className={styles.inputIcon} />
                  Your Experience *
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Tell us about your visit to GreenFields Farm..."
                  className={styles.textarea}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="suggestions">Suggestions for Improvement</label>
                <textarea
                  id="suggestions"
                  name="suggestions"
                  value={formData.suggestions}
                  onChange={handleChange}
                  rows="3"
                  placeholder="How can we make your experience better?"
                  className={styles.textarea}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Would you recommend us to others? *</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="wouldRecommend"
                      value="yes"
                      checked={formData.wouldRecommend === "yes"}
                      onChange={handleChange}
                    />
                    <FaSmile /> Yes, definitely
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="wouldRecommend"
                      value="maybe"
                      checked={formData.wouldRecommend === "maybe"}
                      onChange={handleChange}
                    />
                    <FaMeh /> Maybe
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="wouldRecommend"
                      value="no"
                      checked={formData.wouldRecommend === "no"}
                      onChange={handleChange}
                    />
                    <FaFrown /> No
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className={`btn-primary ${styles.submitBtn}`}
              >
                Submit Feedback →
              </button>
            </form>
          </div>

          {/* Stats Section */}
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>⭐</div>
              <div className={styles.statValue}>4.8</div>
              <div className={styles.statLabel}>Average Rating</div>
              <div className={styles.statSubtext}>From 500+ reviews</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>😊</div>
              <div className={styles.statValue}>98%</div>
              <div className={styles.statLabel}>Happy Visitors</div>
              <div className={styles.statSubtext}>Would return again</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>🏆</div>
              <div className={styles.statValue}>5+</div>
              <div className={styles.statLabel}>Years of Excellence</div>
              <div className={styles.statSubtext}>Award-winning farm</div>
            </div>

            <div className={styles.testimonialPreview}>
              <h3>What Visitors Say</h3>
              <div className={styles.testimonial}>
                <p>"An amazing educational experience for the whole family!"</p>
                <div className={styles.testimonialAuthor}>- Ville Tampere</div>
                <div className={styles.testimonialStars}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={styles.smallStar} />
                  ))}
                </div>
              </div>
              <div className={styles.testimonial}>
                <p>
                  "The Adopt a Cow program is wonderful. My kids love getting
                  updates about Daisy!"
                </p>
                <div className={styles.testimonialAuthor}>- Nrenda Mai</div>
                <div className={styles.testimonialStars}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={styles.smallStar} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackForm;
