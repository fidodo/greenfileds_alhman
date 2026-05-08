// src/components/UpcomingEvents.jsx
import React, { useState } from "react";
import {
  GiCalendar,
  GiAlarmClock,
  GiFarmer,
  GiCow,
  GiCampfire,
  GiPumpkin,
  GiSunflower,
  GiSatelliteCommunication,
} from "react-icons/gi";
import { FaSeedling } from "react-icons/fa";
import styles from "./UpcomingEvents.module.css";

const UpcomingEvents = () => {
  const [filter, setFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: {
        FI: "Lehmien laitumellelasku 2026",
        EN: "Cow Release Festival 2026",
      },
      category: "workshop",
      icon: <GiSunflower size={24} />,
      date: "May 16, 2026",
      time: "10:00 AM - 2:00 PM",
      location: "Hallilantie Pasture",
      description:
        "Discover the fascinating world of bees and learn basic beekeeping skills from our master beekeeper.",
      image: "./cows.png",
      price: "free entry",
      capacity: "8000 people",
      highlights: [
        "Bee suit experience",
        "Honey tasting",
        "Take-home honey jar",
        "Bee identification guide",
      ],
    },
    {
      id: 2,
      title: { FI: "Kevään istutusjuhla", EN: "Spring Planting Festival" },
      category: "festival",
      icon: <FaSeedling size={24} />,
      date: "March 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Main Garden Area",
      description:
        "Join us for our annual spring planting celebration! Learn about organic farming, plant your own vegetables, and enjoy fresh farm-to-table treats.",
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600",
      price: "$15 Adults | $8 Children | Under 3 Free",
      capacity: "200 people",
      highlights: [
        "Hands-on planting workshops",
        "Seed exchange market",
        "Farm fresh lunch",
        "Live folk music",
      ],
    },
    {
      id: 3,
      title: { FI: "Nuorten maanviljelijäkursi", EN: "Young Farmers Workshop" },
      category: "workshop",
      icon: <GiFarmer size={24} />,
      date: "April 5-6, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "Education Barn",
      description:
        "A two-day immersive workshop for kids aged 8-14. Learn animal care, basic farming skills, and sustainable practices.",
      image:
        "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=600",
      price: "$50 per child",
      capacity: "30 children",
      highlights: [
        "Animal feeding experience",
        "Vegetable planting",
        "Egg collecting",
        "Certificate of completion",
      ],
    },
    {
      id: 4,
      title: { FI: "Kesän keräilyjuhla", EN: "Summer Harvest Festival" },
      category: "festival",
      icon: <GiSunflower size={24} />,
      date: "July 20, 2025",
      time: "11:00 AM - 6:00 PM",
      location: "Harvest Field",
      description:
        "Celebrate the bounty of summer with fresh produce, live entertainment, and family-friendly activities.",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
      price: "$20 Adults | $12 Children | Under 3 Free",
      capacity: "500 people",
      highlights: [
        "Pick-your-own vegetables",
        "Farmers market",
        "Cooking demonstrations",
        "Pony rides for kids",
      ],
    },
    {
      id: 5,
      title: {
        FI: "Juuston valmistus työshoppi",
        EN: "Cheese Making Workshop",
      },
      category: "workshop",
      icon: <GiCow size={24} />,
      date: "August 10, 2025",
      time: "1:00 PM - 4:00 PM",
      location: "Dairy Barn",
      description:
        "Learn the art of artisanal cheese making from our expert dairy farmers. Take home your own creation!",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600",
      price: "$45 per person",
      capacity: "15 people",
      highlights: [
        "Hands-on cheese making",
        "Milk tasting",
        "Recipe booklet",
        "Take-home cheese wheel",
      ],
    },
    {
      id: 6,
      title: { FI: "Karkkila & Hallowe'en", EN: "Pumpkin Patch & Halloween" },
      category: "harvest",
      icon: <GiPumpkin size={24} />,
      date: "October 25-31, 2025",
      time: "10:00 AM - 8:00 PM",
      location: "North Pasture",
      description:
        "Pick your own pumpkin, enjoy hayrides, and experience family-friendly Halloween activities.",
      image: "./pumpkin.png",
      price: "$12 entry | Pumpkin extra",
      capacity: "800 people",
      highlights: [
        "Pumpkin picking",
        "Hayrides",
        "Corn maze",
        "Costume parade",
        "Bonfire & s'mores",
      ],
    },
  ];

  const categories = [
    { id: "all", label: "All Events", icon: <GiCalendar /> },
    { id: "festival", label: "Festivals", icon: <GiCampfire /> },
    { id: "workshop", label: "Workshops", icon: <GiFarmer /> },
    { id: "harvest", label: "Harvest", icon: <GiPumpkin /> },
  ];

  const filteredEvents =
    filter === "all"
      ? events
      : events.filter((event) => event.category === filter);

  const getSeasonalColor = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return styles.spring;
    if (month >= 5 && month <= 7) return styles.summer;
    if (month >= 8 && month <= 10) return styles.fall;
    return styles.winter;
  };

  return (
    <section className={`${styles.events} ${getSeasonalColor()}`}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.sectionLabel}>Join Our Events</div>
          <h2 className="section-title">Upcoming Workshops & Festivals</h2>
          <p className={styles.description}>
            Experience the rhythm of farm life through our seasonal events. From
            hands-on workshops to community celebrations, there's always
            something happening at GreenFields.
          </p>
        </div>

        {/* Category Filters */}
        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`${styles.filterBtn} ${filter === cat.id ? styles.activeFilter : ""}`}
            >
              <span className={styles.filterIcon}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className={styles.grid}>
          {filteredEvents.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <div className={styles.cardImage}>
                <img src={event.image} alt={event.title.FI} />

                <div className={styles.cardCategory}>
                  {event.icon}
                  <span>{event.category}</span>
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.eventTitle}>{event.title.FI}</h3>
                <h3 className={styles.eventTitle}>{event.title.EN}</h3>

                <div className={styles.eventDetails}>
                  <div className={styles.detailItem}>
                    <GiCalendar className={styles.detailIcon} />
                    <span>{event.date}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <GiAlarmClock className={styles.detailIcon} />
                    <span>{event.time}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <GiSatelliteCommunication className={styles.detailIcon} />
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className={styles.eventDescription}>{event.description}</p>

                <div className={styles.eventFooter}>
                  <div className={styles.eventPrice}>{event.price}</div>
                  <button
                    className={styles.learnMoreBtn}
                    onClick={() => setSelectedEvent(event)}
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className={styles.newsletter}>
          <div className={styles.newsletterContent}>
            <h3>Never Miss an Event!</h3>
            <p>
              Subscribe to our newsletter and be the first to know about
              upcoming workshops and festivals.
            </p>
            <form className={styles.newsletterForm}>
              <input type="email" placeholder="Your email address" />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className={styles.modal} onClick={() => setSelectedEvent(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              onClick={() => setSelectedEvent(null)}
            >
              ×
            </button>
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className={styles.modalImage}
            />
            <div className={styles.modalBody}>
              <h2>{selectedEvent.title}</h2>
              <div className={styles.modalDetails}>
                <div className={styles.modalDetail}>
                  <GiCalendar /> {selectedEvent.date}
                </div>
                <div className={styles.modalDetail}>
                  <GiAlarmClock /> {selectedEvent.time}
                </div>
                <div className={styles.modalDetail}>
                  <GiSatelliteCommunication /> {selectedEvent.location}
                </div>
              </div>
              <p className={styles.modalDescription}>
                {selectedEvent.description}
              </p>

              <div className={styles.highlights}>
                <h4>Event Highlights:</h4>
                <ul>
                  {selectedEvent.highlights.map((highlight, index) => (
                    <li key={index}>✓ {highlight}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.modalFooter}>
                <div className={styles.modalPrice}>{selectedEvent.price}</div>
                <div className={styles.modalCapacity}>
                  👥 {selectedEvent.capacity}
                </div>
              </div>

              <button className={`btn-primary ${styles.registerBtn}`}>
                Register Now →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UpcomingEvents;
