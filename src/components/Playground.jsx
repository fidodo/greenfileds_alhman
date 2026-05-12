// src/components/Playground.jsx
import React, { useState } from "react";
import {
  FaPlay,
  FaYoutube,
  FaCalendarAlt,
  FaUsers,
  FaStar,
} from "react-icons/fa";
import styles from "./Playground.module.css";

const Playground = () => {
  const [showVideo, setShowVideo] = useState(false);

  // YouTube video ID
  const YOUTUBE_VIDEO_ID = "j_Py8iBm9OE";

  const popularEvents = [
    {
      id: 1,
      title: "Summer Camp 2025",
      date: "July 15-20, 2025",
      participants: 8000,
      rating: 4.9,
      image: "./summercamp.jpeg",
      description: {
        fi: "Lehmien laitumellelasku 2026",
        en: "Cow Release Festival 2026 - Celebrate the joy of nature as we release our cows into the pasture for the summer season. Enjoy farm activities, games, and a picnic on the grass. A beloved tradition that marks the start of our outdoor adventures!",
      },
    },
  ];

  return (
    <section className={styles.playground}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.textContent}>
            <div className={styles.sectionLabel}>Natural Playground</div>
            <h2 className={styles.title}>Outdoor Adventures & Learning</h2>
            <p className={styles.description}>
              Our 16-Hectare natural playground combines adventure with
              education. Children explore, climb, and discover nature while
              developing crucial physical and social skills.
            </p>
            <ul className={styles.features}>
              <li>✓ Woodland climbing structures</li>
              <li>✓ Vegetable garden plots for kids</li>
              <li>✓ Animal interaction areas</li>
              <li>✓ Mud kitchen and sensory play</li>
            </ul>
          </div>
          <div className={styles.imageGrid}>
            <img
              src="./applegarden.webp"
              alt="Apple Garden"
              className={styles.image}
              loading="lazy"
            />

            <img
              src="./tableTennis.webp"
              alt="Table Tennis"
              className={styles.image}
              loading="lazy"
            />

            <img
              src="./Grill.webp"
              alt="Grill"
              className={styles.image}
              loading="lazy"
            />

            <img
              src="./gym.webp"
              alt="Gym"
              className={styles.image}
              loading="lazy"
            />
          </div>
        </div>

        <div className={styles.popularEvents}>
          <div className={styles.eventsHeader}>
            <FaStar className={styles.starIcon} />
            <h3>Popular Event</h3>
            <p>Most loved activities by our community</p>
          </div>

          <div className={styles.eventsGrid}>
            {popularEvents.map((event) => (
              <div key={event.id} className={styles.eventCard}>
                <div className={styles.eventImageContainer}>
                  <img
                    src={event.image}
                    alt={event.title}
                    className={styles.eventImage}
                    onError={(e) => {
                      e.target.src = "./picsCow.webp";
                    }}
                  />

                  <div className={styles.eventRating}>
                    <FaStar className={styles.ratingStar} />
                    <span>{event.rating}</span>
                  </div>
                </div>
                <div className={styles.eventInfo}>
                  <h4 className={styles.eventTitle}>{event.title}</h4>
                  <div className={styles.eventMeta}>
                    <div className={styles.eventDate}>
                      <FaCalendarAlt className={styles.metaIcon} />
                      <span>{event.date}</span>
                    </div>
                    <div className={styles.eventParticipants}>
                      <FaUsers className={styles.metaIcon} />
                      <span>{event.participants}+ joined</span>
                    </div>
                  </div>
                  <p className={styles.eventDescription}>
                    {event.description.en}
                  </p>

                  {/* YouTube Video Section - INSIDE THE CARD */}
                  <div className={styles.videoSection}>
                    <div className={styles.videoHeader}>
                      <FaYoutube className={styles.youtubeIcon} />
                      <h4>Watch Our Farm in Action</h4>
                    </div>

                    <div className={styles.videoContainer}>
                      {!showVideo ? (
                        <div
                          className={styles.videoThumbnail}
                          onClick={() => setShowVideo(true)}
                        >
                          <img
                            src="./cows.jpeg"
                            alt="Farm Tour Video"
                            className={styles.thumbnailImage}
                            onError={(e) => {
                              e.target.src =
                                "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400";
                            }}
                          />

                          <div className={styles.playButton}>
                            <FaPlay className={styles.playIcon} />
                          </div>
                          <div className={styles.videoDuration}>Watch Tour</div>
                        </div>
                      ) : (
                        <div className={styles.videoWrapper}>
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
                            title="AhlmanEdu Farm Tour"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className={styles.iframe}
                          ></iframe>
                        </div>
                      )}
                    </div>
                  </div>

                  <button className={styles.eventButton}>Learn More →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Playground;
