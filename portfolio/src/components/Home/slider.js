import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faCircle,
  faCircleDot
} from '@fortawesome/free-solid-svg-icons'

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const containerStyler = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%'
  }

  const slideStyler = {
    width: '100%',
    flex: 1,
    borderRadius: '0px',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    backgroundImage: `url(${slides[currentIndex].url})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#0f1419'
  }

  const leftArrowStyling = {
    position: 'absolute',
    top: '50%',
    left: '8px',
    transform: 'translateY(-50%)',
    fontSize: '28px',
    color: '#fff',
    zIndex: 2,
    cursor: 'pointer',
    userSelect: 'none',
    border: 'none',
    background: 'transparent',
    padding: '6px'
  }

  const rightArrowStyling = {
    position: 'absolute',
    top: '50%',
    right: '8px',
    transform: 'translateY(-50%)',
    fontSize: '28px',
    color: '#fff',
    zIndex: 2,
    cursor: 'pointer',
    userSelect: 'none',
    border: 'none',
    background: 'transparent',
    padding: '6px'
  }

  const goPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goNext = () => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const dotContainer = {
    display: 'flex',
    justifyContent: 'center',
    padding: '8px 0 0 0'
  }

  const dotStyles = {
    margin: '0 4px',
    cursor: 'pointer',
    fontSize: '12px',
    border: 'none',
    background: 'transparent',
    color: '#ffffffcc',
    padding: '2px'
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <div style={containerStyler}>
      <button
        type="button"
        style={leftArrowStyling}
        onClick={goPrevious}
        aria-label="Previous slide"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        type="button"
        style={rightArrowStyling}
        onClick={goNext}
        aria-label="Next slide"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      <div style={slideStyler}></div>

      <div style={dotContainer}>
        {slides.map((slide, slideIndex) => (
          <button
            key={slideIndex}
            style={dotStyles}
            onClick={() => goToSlide(slideIndex)}
            aria-label={`Go to slide ${slideIndex + 1}`}
            type="button"
          >
            <FontAwesomeIcon
              icon={currentIndex === slideIndex ? faCircleDot : faCircle}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
