import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const handlePlayVideo = () => {
    setVideoPlaying(true);
  };

  useEffect(() => {
    if (videoPlaying) {
      const timer = setTimeout(() => setShowForm(true), 45000); // Muestra el formulario después de 40 segundos
      return () => clearTimeout(timer);
    }
  }, [videoPlaying]);

  return (
    <div className="background">
      {!videoPlaying && (
        <div className="pre-video">
          <h1 className="typing-effect">
            Thanks to be part
            <br />
            of this great experience
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
            <div className="form-group">
              <label htmlFor="nombre">Ingresa tu código de confirmación</label>
              <input
                type="text"
                id="code"
                name="code"
                placeholder="Ingresa tu código"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
