
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import img1 from "../assets/img1.png";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.png";

const images = [
  { src: img1, description: "Wyrenderowane w Cinema4D" },
  { src: img2, description: "Stworzenie własnej marki odzieżowej" },
  { src: img3, description: "Tworzenie logo w illustratorze" }
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPageLoad, setIsPageLoad] = useState(true);
  const [isImageSwitching, setIsImageSwitching] = useState(false);

  const nextImage = () => {
    if (isImageSwitching) return;
    
    setIsImageSwitching(true);
    setIsPageLoad(false);
    setCurrentIndex((p) => (p + 1) % images.length);
  };

  const prevImage = () => {
    if (isImageSwitching) return;
    
    setIsImageSwitching(true);
    setIsPageLoad(false);
    setCurrentIndex((p) => (p - 1 + images.length) % images.length);
  };


  useEffect(() => {
    if (isImageSwitching) {
      const timer = setTimeout(() => {
        setIsImageSwitching(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isImageSwitching, currentIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isImageSwitching]);


  useEffect(() => {
    setIsPageLoad(true);
  }, []);

  return (
    <div className="gallery-root">
      <div className="gallery-wrapper">
        <button 
          onClick={prevImage} 
          className={`side-arrow-btn left-arrow ${isPageLoad ? 'page-load-fade' : 'fast-fade'}`}
          disabled={isImageSwitching}
        >
          <ChevronLeft size={32} />
        </button>
        
        <div className={`gallery-container ${isPageLoad ? 'page-load-fade' : 'fast-fade'}`}>
          <img 
            key={currentIndex}
            src={images[currentIndex].src} 
            alt={`Gallery image ${currentIndex + 1}`}
            className={`gallery-img ${isImageSwitching ? 'fast-fade' : ''}`}
            onLoad={() => {
              if (isImageSwitching) {
                const img = document.querySelector('.gallery-img');
                if (img) {
                  img.classList.remove('fast-fade');
                  void (img as HTMLElement).offsetWidth;
                  img.classList.add('fast-fade');
                }
              }
            }}
          />
          <div className={`image-description ${isPageLoad ? 'page-load-fade' : 'fast-fade'}`}>
            {images[currentIndex].description}
          </div>
        </div>
        
        <button 
          onClick={nextImage} 
          className={`side-arrow-btn right-arrow ${isPageLoad ? 'page-load-fade' : 'fast-fade'}`}
          disabled={isImageSwitching}
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}