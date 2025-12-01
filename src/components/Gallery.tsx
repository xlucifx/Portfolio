
import React, { useState, useEffect, useRef } from "react";
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

  // Touch/pointer support for mobile swiping
  const touchStartX = useRef<number | null>(null);
  const touchLastX = useRef<number | null>(null);
  const isTouching = useRef(false);

  const SWIPE_THRESHOLD = 40; // pixels

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isImageSwitching) return;
    // Ignore swipe start if the user tapped a control button
    if ((e.target as Element).closest('.side-arrow-btn')) return;
    touchStartX.current = e.touches[0].clientX;
    touchLastX.current = touchStartX.current;
    isTouching.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching.current) return;
    touchLastX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isTouching.current || touchStartX.current === null || touchLastX.current === null) {
      isTouching.current = false;
      return;
    }

    const dx = touchLastX.current - touchStartX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) {
        nextImage();
      } else {
        prevImage();
      }
    }

    touchStartX.current = null;
    touchLastX.current = null;
    isTouching.current = false;
  };

  // Pointer events for desktop mouse drag support
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isImageSwitching) return;
    // Only left mouse button
    if (e.pointerType === 'mouse' && (e as any).button !== 0) return;
    if ((e.target as Element).closest('.side-arrow-btn')) return;
    touchStartX.current = e.clientX;
    touchLastX.current = e.clientX;
    isTouching.current = true;
    try { (e.currentTarget as Element).setPointerCapture(e.pointerId); } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isTouching.current) return;
    touchLastX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isTouching.current) return;
    const dx = (touchLastX.current ?? 0) - (touchStartX.current ?? 0);
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) nextImage(); else prevImage();
    }
    isTouching.current = false;
    touchStartX.current = null;
    touchLastX.current = null;
    try { (e.currentTarget as Element).releasePointerCapture(e.pointerId); } catch {}
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
      <div
        className="gallery-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
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
            onDragStart={(e) => e.preventDefault()}
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
          <div className={`image-description ${isPageLoad ? 'page-load-fade' : 'fast-fade'}`} aria-live="polite">
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
        {/* Small mobile hint to indicate swipe navigation */}
        <div className="swipe-hint">Przesuń palcem, aby przejść</div>
      </div>
    </div>
  );
}