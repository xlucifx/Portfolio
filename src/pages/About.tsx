import { useState, useEffect } from "react";
import img from "../assets/IMG_9555.jpg";

export default function About() {
  const [isPageLoad, setIsPageLoad] = useState(true);

 
  useEffect(() => {
    setIsPageLoad(true);
  }, []);

  return (
    <div className="about-page">
    
      <div className={`about-photo-container ${isPageLoad ? 'page-load-fade' : 'fast-fade'}`}>
        <img 
          src={img} 
          alt="Jakub Guzy" 
          className="about-photo"
        />
      </div>
      
    
      <div className={`about-content-box ${isPageLoad ? 'page-load-fade' : 'fast-fade'}`}>
        <div className="about-content">
          <h2 className="about-title">O Mnie</h2>
          <p className="about-text">
            Nazywam się Jakub i w tym portfolio zbieram rzeczy którymi mogę się pochwalić 
            które będę aktualizować z biegiem czasu.
          </p>
          <div className="about-cv">
            <strong>Moje CV:</strong>
            <a 
              href="https://jakubguzy.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cv-link"
            >
              https://jakubguzy.netlify.app/
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}