import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'
import ImageSlider from './slider'
import image1 from './../../assets/images/IMG_1.JPG'
import image2 from './../../assets/images/IMG_2.JPG'
import image3 from './../../assets/images/IMG_3.PNG'
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

const Home = () => {
  const slides = [{url: image1, title: "image 1"},
                  {url: image2, title: "image 1"},
                  {url: image3, title: "image 1"},
                  {url: image4, title: "image 1"},
                  {url: image5, title: "image 1"},
                  {url: image6, title: "image 1"},
                  {url: image7, title: "image 1"},
                  {url: image8, title: "image 1"},
                  {url: image9, title: "image 1"},
                  {url: image10, title: "image 1"},
                  {url: image11, title: "image 1"},
                  {url: image12, title: "image 1"},
                  {url: image13, title: "image 1"},
                  {url: image14, title: "image 1"},
                  ]
  const [letterClass, setLetterClass] = useState('text-animate')
  const nameArray = [' ','N','a', 't', 'h', 'a', 'n', ',',' ','a','n']
  const jobArray = ['A','S','U',' ','C','o','m','p','u','t','e','r', 
   ' ','S','c','i','e','n','c','e',' ',' ',' ',' ','s','t','u','d','e','n','t',]

  useEffect(() => {
    return () => {setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 7000)
}}, [])

  return (
    <>
      <div className="container home-page">
        <div className='sliderFormatter'><ImageSlider slides={slides}/></div>
        <div className="text-zone">
          <h1>
            <span className={letterClass}>Hello</span>
            <span className={`${letterClass} _12`}>,</span>
            <br />
            <span className={`${letterClass} _13`}>I</span>
            <span className={`${letterClass} _14`}>'m</span>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={16}
            />
            <br />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={jobArray}
              idx={22}
            />
          </h1>
          <h2>Front End Developer | Backend Developer | Hacker</h2>
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