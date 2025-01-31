import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [invitationId, setInvitationId] = useState("");
  const [guestDetails, setGuestDetails] = useState("");

  const handlePlayVideo = () => {
    setVideoPlaying(true);
    axios
      .patch("https://party.cloudzeetech.org/api/guests/" + invitationId, {
        confirmated: true,
      })
      .then((res) => setGuestDetails(res.data))
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
    const parts = path.split("/update_registry/");
    if (parts.length > 1) {
      setInvitationId(parts[1]); // Decodificar URL
      axios
        .get("https://party.cloudzeetech.org/api/guests/" + parts[1])
        .then((res) => setGuestDetails(res.data))
        .catch((err) => console.log(err));
    } else {
      const otherParts = path.split("/welcome/");
      setInvitationId(otherParts[1]); // Decodificar URL
      axios
        .get("https://party.cloudzeetech.org/api/guests/" + otherParts[1])
        .then((res) => setGuestDetails(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="background">
      {invitationId === "" ? (
        <div className="error-container">
          <h1 className="error-title">Ops..</h1>
          <p className="error-message">
            Parece que hubo un error con el código de confirmación de tu
            invitación.
          </p>
          <p className="error-message">
            Contacta al cumpleañero para verificar el estatus de tu invitación.
          </p>
        </div>
      ) : (
        <div>
          {!videoPlaying && (
            <div className="pre-video">
              <h1 className="typing-effect">
                Thanks to be part
                <br />
                of this great experience
                <br />
                {guestDetails.name}
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
                    Numero de boletos: {guestDetails.no_tickets}
                  </label>
                  <label htmlFor="nombre" className="map-label">
                    Inicia 14:00 hrs
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
                    Love You {guestDetails.name} ♥️
                  </label>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
