import React, { useState, useEffect } from 'react';
import { image1, image2, image3, image4 } from './assets/images';
import './style.css';

export default function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1,
    },
    {
      thumb: image2,
      image: image2,
    },
    {
      thumb: image3,
      image: image3,
    },
    {
      thumb: image4,
      image: image4,
    },
  ];
  const [catalogs] = useState([...catalogsList]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideTimer, setSlideTimer] = useState(null);
  const [slideDuration] = useState(3000);

  useEffect(() => {
    if (slideTimer) {
      const timer = setInterval(() => {
        if (activeIndex === catalogs?.length - 1) {
          setActiveIndex(0);
        } else {
          setActiveIndex((prev) => prev + 1);
        }
      }, slideDuration);
      return () => {
        clearInterval(timer);
      };
    }
  }, [slideTimer, activeIndex]);

  const handlePrevClick = () => {
    if (activeIndex === 0) {
      setActiveIndex(catalogs?.length - 1);
    } else {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    if (activeIndex === catalogs?.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  const handleSlideShow = (e) => {
    if (e.target.checked) {
      setSlideTimer(true);
    } else {
      setSlideTimer(false);
    }
  };

  return (
    <div className="app-container">
      <div className="image-container">
        <img
          src={catalogs[activeIndex].image}
          style={{
            height: '400px',
            width: '400px',
          }}
        />
      </div>
      <div className="images-container">
        <button
          className="icon-only outlined"
          data-testid="prev-slide-btn"
          onClick={handlePrevClick}
          style={{
            height: '50px',
            width: '50px',
            margin: 'auto',
          }}
        >
          <i className="material-icons">arrow_back</i>
        </button>
        {catalogs?.map((item, index) => (
          <div
            onClick={() => handleImageClick(index)}
            className={`${index === activeIndex ? 'active' : 'not-active'}`}
          >
            <img
              src={item.image}
              style={{
                height: '100px',
                width: '100px',
              }}
            />
          </div>
        ))}
        <button
          className="icon-only outlined"
          data-testid="next-slide-btn"
          onClick={handleNextClick}
          style={{
            height: '50px',
            width: '50px',
            margin: 'auto',
          }}
        >
          <i className="material-icons">arrow_forward</i>
        </button>
      </div>
      <div
        style={{
          margin: 'auto',
        }}
      >
        <input
          type="checkbox"
          data-testid="toggle-slide-show-button"
          onChange={(e) => handleSlideShow(e)}
        />
        <label className="checkbox-label">Start Slide Show</label>
      </div>
    </div>
  );
}
