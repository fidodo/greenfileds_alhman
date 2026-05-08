// src/pages/Home.jsx
import React from "react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import About from "../components/About";
import UpcomingEvents from "../components/UpcomingEvents";
import Playground from "../components/Playground";
import FarmLife from "../components/FarmLife";
import AdoptCow from "../components/AdoptCow";
import Newsletter from "../components/Newsletter";
import FeedbackForm from "../components/FeedbackForm";

const Home = () => {
  return (
    <>
      <section id="home">
        <Hero />
        <Stats />
        <About />
      </section>

      <section id="playground">
        <Playground />
      </section>

      <section id="farm-life">
        <FarmLife />
      </section>

      <section id="adopt">
        <AdoptCow />
      </section>

      <section id="events">
        <UpcomingEvents />
      </section>

      <section id="feedback">
        <FeedbackForm />
      </section>

      <section id="contact">
        <Newsletter />
      </section>
    </>
  );
};

export default Home;
