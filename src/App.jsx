import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [invitationId, setInvitationId] = useState("");
  const [guestName, setGuestName] = useState("");

  const handlePlayVideo = () => {
    setVideoPlaying(true);
    axios
      .patch("https://party.cloudzeetech.org/api/guests/" + invitationId, {
        confirmated: true,
      })
      .then((res) => setGuestName(res.data.name))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (videoPlaying) {
      const timer = setTimeout(() => setShowForm(true), 45000); // Muestra el formulario después de 40 segundos
      return () => clearTimeout(timer);
    }
  }, [videoPlaying]);

  useEffect(() => {
    const path = window.location.pathname;
    // Extraer el ID después de /verify_invitation/
    const parts = path.split("/verify_invitation/");
    if (parts.length > 1) {
      setInvitationId(parts[1]); // Decodificar URL
      axios
        .get("https://party.cloudzeetech.org/api/guests/" + parts[1])
        .then((res) => setGuestName(res.data.name))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="background">
      {!videoPlaying && (
        <div className="pre-video">
          <h1 className="typing-effect">
            Thanks to be part
            <br />
            of this great experience
            <br />
            {guestName}
          </h1>
          <button className="play-button" onClick={handlePlayVideo}>
            Iniciar confirmación de asistencia
          </button>
        </div>
      )}
      {videoPlaying && (
        <div className="video-wrapper">
          <video autoPlay loop className="video">
            <source src="/assets/initialVideo.mp4" type="video/mp4" />
            Tu navegador no soporta videos.
          </video>
        </div>
      )}
      {showForm && (
        <div className="form-container">
          <form className="animated-form">
            <div className="form-group map-container">
              <label htmlFor="nombre" className="map-label">
                March 08, starts at 14:00
              </label>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.373502827694!2d-99.66419192447394!3d19.266117045975975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cd89a0b674a73f%3A0x329d596bc77c7d7e!2sAnthuriums%20Hall%20and%20Garden!5e0!3m2!1sen!2smx!4v1738350986632!5m2!1sen!2smx"
                width="100%"
                height="350"
                style={{ border: "0" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <label htmlFor="nombre" className="map-label">
                Love You {guestName} ♥️
              </label>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
