import { useState } from "react"

const ImageSlider = ({slides}) => {
    const[currentIndex, setCurrentIndex] = useState(0)
    
    const containerStyler = {
        height: "100%",
        position: "relative",

    }
    const slideStyler = {
        width: '100%',
        height: '100%',
        borderRadius: '0px',
        backgroundPosition: 'center',
        backgroundSize: "cover",
        backgroundImage: `url(${slides[currentIndex].url})`


    }
    const leftArrowStyling = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
      
        fontSize: "45px",
        color: "#fff",
        zIndex: 1,
        cursor: "pointer",
    }
    const rightArrowStyling = {
        position: "absolute",
        top: '50%',
        transform: "translate(0, -50%)",
        right: '0px',
        fontSize: '45px',
        color: '#fff',
        zIndex: 1,
        cursor: "pointer",
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
        justifyContent: 'center'
    }
    const dotStyles = {
        margin: '0 3px',
        cursor: 'pointer',
        fontSize: '13px'

    }
    const goToSlide = slideIndex => {
        setCurrentIndex(slideIndex)
    }
    return (
    <div style={containerStyler}>
        <div style={leftArrowStyling} onClick={goPrevious}>←</div>
        <div style={rightArrowStyling} onClick={goNext}>→</div>
        <div style={slideStyler}></div>
        <div style={dotContainer}>
            {slides.map((slide, slideIndex) => (
                <div key={slideIndex} style={dotStyles} onClick={() => goToSlide(slideIndex)}>⬤</div>
            ))}
        </div>
    </div>
   
)}

export default ImageSlider