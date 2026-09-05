import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loaders'
import './index.scss'
import ImageSlider from './slider'
import image1 from './../../assets/images/IMG_3.PNG'
import image2 from './../../assets/images/IMG_2.JPG'
import image3 from './../../assets/images/IMG_1.JPG'
import image4 from './../../assets/images/IMG_4.jpg'
import image5 from './../../assets/images/IMG_5.jpg'
import image6 from './../../assets/images/IMG_6.jpg'
import image7 from './../../assets/images/IMG_7.jpg'
import image8 from './../../assets/images/IMG_8.jpg'
import image9 from './../../assets/images/IMG_9.jpg'
import image10 from './../../assets/images/IMG_10.jpg'
import image11 from './../../assets/images/IMG_11.jpg'
import image12 from './../../assets/images/IMG_12.jpg'
import image13 from './../../assets/images/IMG_13.PNG'
import image14 from './../../assets/images/IMG_14.jpg'
import Google from './googlework'
import ResumeCyber from './../../assets/documents/Nathan_Svoboda_Resume_Cybersecurity.pdf'
import ResumeSoft from './../../assets/documents/Nathan_Svoboda_Resume_Software.pdf'
const Home = () => {
  const resumeButtonHandler = (pdfUrl, filename) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = filename;
    document.body.appendChild(link); // Append the link to the document
    link.click(); // Programmatically click the link
    document.body.removeChild(link); // Remove the link after clicking
  };
  const slides = [{ url: image1, title: "image 1" },
  { url: image2, title: "image 1" },
  { url: image3, title: "image 1" },
  { url: image4, title: "image 1" },
  { url: image5, title: "image 1" },
  { url: image6, title: "image 1" },
  { url: image7, title: "image 1" },
  { url: image8, title: "image 1" },
  { url: image9, title: "image 1" },
  { url: image10, title: "image 1" },
  { url: image11, title: "image 1" },
  { url: image12, title: "image 1" },
  { url: image13, title: "image 1" },
  { url: image14, title: "image 1" },
  ]
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setLetterClass('text-animate-hover')
      }, 7000)
    }
  }, [])

  return (
    <>
      <div className="container home-page">
        <div className='signIn'>
          <p className="signin-disclaimer">
            Google sign-in works, but storing the user session token is blocked
            on GitHub Pages by unavoidable CORS policy restrictions.
          </p>
          <Google />
        </div>
        <div className='resume-container'>
          <button
            className='resume-download-b'
            onClick={() => resumeButtonHandler(ResumeCyber, 'Nathan-Svoboda-Resume-Cybersecurity.pdf')}
          >
            Resume - Cybersecurity
          </button>
          <button
            className='resume-download-b'
            onClick={() => resumeButtonHandler(ResumeSoft, 'Nathan-Svoboda-Resume-Software.pdf')}
          >
            Resume - Software
          </button>
        </div>
        <div className="socials-hint">
          <span className="socials-arrow" aria-hidden="true" />
          <span className="socials-text">check out my socials!</span>
        </div>
        <div className='sliderFormatter'><ImageSlider slides={slides} /></div>
        <div className="text-zone">
          <h1>
            <span className={letterClass}>Hello</span>
            <span className={`${letterClass} _12`}>,</span>{' '}
            <span className={`${letterClass} _13`}>I</span>
            <span className={`${letterClass} _14`}>'</span>
            <span className={`${letterClass} _14`}>m</span>{' '}
            <span className={`${letterClass} _14`}>Nathan</span>{' '}
            <span className={`${letterClass} _15`}>an</span>{' '}
            <span className={`${letterClass} _16`}>ASU</span>{' '}
            <span className={`${letterClass} _17`}>Computer</span>{' '}
            <span className={`${letterClass} _18`}>Science</span>{' '}
            <span className={`${letterClass} _19`}>Graduate</span>
          </h1>

          <h2>Hacker | Front-End Developer | Back-End Developer</h2>
          <Link to="/contact" className="flat-button">
            CONTACT ME
          </Link>
        </div>
      </div>

      <Loader type="pacman" />
    </>
  )
}

export default Home
