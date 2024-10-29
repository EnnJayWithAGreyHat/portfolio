import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'
import ImageSlider from './slider'

const Home = () => {
  const slides = [{url:'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/a8bf1a2c-259e-4e95-b2c2-bb995876ed63/a252bcd6-9a10-40be-bf99-1d850d2026e4.png', title:'something'},
                  {url:'https://images.ctfassets.net/ub3bwfd53mwy/5WFv6lEUb1e6kWeP06CLXr/acd328417f24786af98b1750d90813de/4_Image.jpg?w=750', title:'something'},
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