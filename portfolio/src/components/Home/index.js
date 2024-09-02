import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const Home = () => {
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
        <div className="projects">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDBfQGwaEWjP3eiMUMFbW6dTHuGJVMMiCdjw&s" alt='Erm wrong link' className='para'>
          </img>
          <p className='yap'>I write python in (libraries) for Paragon, and we are working to build drones to detect and relinquish fires
            in high risk areas before they damage large populations. Locations such as Arizona, California, Hawaii and others.
          </p>
        </div>
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