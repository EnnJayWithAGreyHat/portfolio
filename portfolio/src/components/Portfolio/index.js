import { useRef, useState, useEffect, createContext, useContext } from 'react'
import Loader from 'react-loaders'
import { v4 as uuidv4 } from 'uuid'
import './index.scss'
import { faKaggle, faGithub, faLinux, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import orangeBelt from '../../assets/images/WHENORANGE.png'
import sqlCertK from '../../assets/images/Nathan Svoboda - Intro to SQL.png'
import pandasCertK from '../../assets/images/Nathan Svoboda - Pandas.png'

import orangeB from '../../assets/images/orangeBELT.svg'
import yellowB from '../../assets/images/yellowBELT.svg'
import greenB from '../../assets/images/greenBELT.svg'
import blueB from '../../assets/images/blueBELT.svg'

import HES from '../../assets/images/Hawkeye_Logo.png'
import Para from '../../assets/images/pairofgons.jpg'
import visHVAC from '../../assets/images/visualHVAC9.png'
import aboutUS from '../../assets/images/aboutusimg.jpeg'
import demoDrone from '../../assets/images/demo_drone.jpeg'
import graph1 from './graph-files/grid_weighted_directed.txt'
import graph2 from './graph-files/grid_unweighted_directed.txt'
import graph3 from './graph-files/grid_weighted_undirected.txt'
import graph4 from './graph-files/grid_unweighted_undirected.txt'
import GraphVisualization from './visualization'

const Context = createContext(null)

const LETTERS = ['L', 'e', 'a', 'r', 'n', 'i', 'n', 'g']

const Portfolio = () => {
  const [selectedFile, setSelectedFile] = useState(graph1)
  const [globalState, setGlobalState] = useState([])

  const kaggleRef = useRef(null)
  const pwnedRef = useRef(null)
  const codeProjectsRef = useRef(null)
  const professionalRef = useRef(null)
  const beltProgressRef = useRef(null)

  const [beltProgressVisible, setBeltProgressVisible] = useState(false)

  useEffect(() => {
    const target = beltProgressRef.current

    if (!target) {
      return undefined
    }

    if (typeof IntersectionObserver === 'undefined') {
      setBeltProgressVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBeltProgressVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [])

  const scrollTo = (sectionRef) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleDelete = (event) => {
    const keyToDelete = event.currentTarget.dataset.key
    setGlobalState((oldState) =>
      oldState.filter((value) => value.setkey !== keyToDelete)
    )
  }

  return (
    <>
    <div className="container portfolio">
      <section className="experimentalSection">
        <div className="experimentalHeader">
          <h2 className="experimentalTitle">Experimental</h2>
          <h1 className="title1" aria-label="Learning">
            {LETTERS.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className={`letter letter-${index + 1} learning-bounce`}
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                {letter}
              </span>
            ))}
          </h1>
          <p className="extrainfo">
            This section is not only a sandbox for some fun UI ideas that I have, it also includes some of the very first
            things that I learned how to do in React during my internship with Hawkeye Energy Solutions. Try clicking the
            "What am I up to" buttons, they work!
          </p>
        </div>

        <div className="experimentalGrid">
          <Context.Provider value={{ globalState, setGlobalState }}>
            <div className="nameListPanel">
              <h2>Temporary Name List</h2>
              <Helper />
              <ul className="elements">
                {globalState.map((inValue) => (
                  <li key={inValue.setkey} className="nameList">
                    <span>{inValue.firstname}</span>
                    <span>{inValue.lastname}</span>
                    <button
                      type="button"
                      data-key={inValue.setkey}
                      className="delButton"
                      onClick={handleDelete}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Context.Provider>
          <div className="aboutNate">
            <h2 className="titleNate">What am I up to?</h2>
            <p className="upToSummary">
              I alternate between data science practice, cybersecurity labs, and
              code architecture work. Use these cards to jump directly to each
              section.
            </p>
            <div className="jumpCards">
              <button type="button" className="jumpCard" onClick={() => scrollTo(professionalRef)}>
                <FontAwesomeIcon icon={faLinkedinIn} />
                <span>Professional Experience</span>
              </button>
              <button type="button" className="jumpCard" onClick={() => scrollTo(pwnedRef)}>
                <FontAwesomeIcon icon={faLinux} />
                <span>pwn.college Progress</span>
              </button>
              <button
                type="button"
                className="jumpCard"
                onClick={() => scrollTo(codeProjectsRef)}
              >
                <FontAwesomeIcon icon={faGithub} />
                <span>Code Projects</span>
              </button>
              <button type="button" className="jumpCard" onClick={() => scrollTo(kaggleRef)}>
                <FontAwesomeIcon icon={faKaggle} />
                <span>Kaggle Learning</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className='portfolio-section professional' ref={professionalRef}>
        <div className='section-content'>
          <div className='section-header'>
            <h2>Professional Experience</h2>
            <p className='section-summary'>Previous professional work experience.</p>
          </div>
          <div className="section-grid">
            <div className="section-card">
              <a href="https://hawkeye-es.com/" target='_blank'><img className="experience-image" src={HES} alt="Hawkeye Energy Solutions 11"/></a>
              <div className="experience-body">
                <p>
                  At Hawkeye Energy Solutions (a United Engineering partner), I spent the summers of 2024 and 2025
                  improving software that processes and visualizes HVAC data for commercial buildings. I refactored
                  core Java modules to run on a supervisor-level computer, improving performance, and went beyond
                  baseline methods by researching advanced <a href="https://www.automatedbuildings.com/wsim/Baja_White_Paper.pdf" target="_blank" rel="noreferrer">BAJA</a> libraries
                  and documentation to implement efficient, maintainable techniques.
                </p>
                <figure className="experience-visual">
                  <img
                    className="experience-placeholder"
                    src="https://d33v4339jhl8k0.cloudfront.net/docs/assets/63dab7931dbc1e7f031044d5/images/68124261e7b86320b6e433d7/file-Q0eXuXZKAv.png"
                  />
                  <figcaption>
                    Building automation dashboard showing HVAC floor-plan metrics from Niagara by Tridium
                  </figcaption>
                </figure>
                <p>
                  I tuned SQL queries for customer summary applications, archived 100,000+ data points, verified
                  integrity, and traced historical records to diagnose anomalies. I also managed urgent negotiations
                  to procure specialized HVAC components for time-sensitive system repairs, balancing technical needs
                  with budget considerations.
                </p>
                <figure className="experience-visual">
                  <img
                    className="experience-placeholder"
                    src={visHVAC}
                  />
                  <figcaption>
                    A showcase of Visual HVAC, a tool that I worked on improving during my time at Hawkeye Energy Solutions
                  </figcaption>
                </figure>
                <p>
                  On the front end, I built interactive React dashboards to display floor-plan metrics and addressed
                  responsive scaling, state management, and backend integration for production-ready delivery. I also
                  integrated Python APIs with external metering services to automate data collection and real-time
                  performance analysis, and modernized a graphics library with SVG redesign and JavaScript WebWidgets
                  to support dark mode. I collaborated closely across teams and consolidated documentation to
                  contribute effectively from day one.
                </p>
              </div>
            </div>
            <div className='section-card'>
              <a href='https://www.linkedin.com/company/paragon-autonomous'><img className="experience-image" src={Para} alt="Paragon project" /></a>
              <div className="experience-body">
                <p>
                  Through an Arizona State University collaboration, I joined a software team building a drone
                  platform that detects and navigates toward small residential fires in at-risk areas to help prevent
                  larger wildfires. Since the beginning of the project, we expanded the mission to include suppressing
                  house fires and delivering medical necessities during natural disasters.
                </p>
                <figure className="experience-visual">
                  <img
                    className="experience-placeholder"
                    src={demoDrone}
                  />
                  <figcaption>
                    This is not the drone that we had built, but is similar to the goal that the hardware team had for our drone
                  </figcaption>
                </figure>
                <p>
                  We are implementing autonomous movement with pathfinding and collision-avoidance logic using
                  infrared and other sensors, with the eventual goal of supporting entire communities. We split into
                  two teams: the hardware team 3D-printed a rugged frame and plans to wire four independent motors as
                  supplies become available, while the software team delivered the code for a model drone.
                </p>
                <figure className="experience-visual">
                  <img
                    className="experience-placeholder"
                    src={aboutUS}
                  />
                  <figcaption>
                    Close up of some soldering required for the controller
                  </figcaption>
                </figure>
                <p>
                  We planned to assemble and test both the hardware and software implementations in the fall semester
                  of 2024 once all required materials were available. While part of the construction was done, the software team
                  was focused on getting the ROS2 backend working with a map layout for all drones using a heartbeat positional update.
                  Furthermore, we worked on utilizing Ardupilot to make a ground control station, make our own mission planner, 
                  use a tool called Gazebo for modeling, and  
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="portfolio-section pwned" ref={pwnedRef}>
        <div className="section-content">
          <div className="section-header">
            <h2>pwn.college Progress</h2>
            <p className="section-summary">
              Hands-on security engineering practice built around methodical
              debugging and strong systems fundamentals.
            </p>
          </div>
          <div className="section-grid">
            <div className="section-card">
              <a href='https://ennjaywithagreyhat.github.io/portfolio/#/about'>
              <img className="orangebelt" src={orangeBelt} alt="Orange Belt"/></a>
              <h3>Orange Belt Core Skills</h3>
              <ul>
                <li>Web vulnerabilities and exploit chains</li>
                <li>Networking and protocol analysis</li>
                <li>Cryptography and defensive reasoning</li>
                <li>Reverse engineering and binary exploitation</li>
                <li>Linux fundamentals and privilege boundaries</li>
                <li>Memory layout, stack/heap behavior, and C pitfalls</li>
                <li>Debugger-driven triage with GDB and pwndbg</li>
                <li>Exploit scripting and automation workflows</li>
                <li>Read more about it here: <a href='https://ennjaywithagreyhat.github.io/portfolio/#/about'>On my other page</a> </li>
              </ul>
            </div>
            <div className="section-card">
                <h3>Yellow and Green Belt Progress</h3>
                <p>
                  Taking CSE466 at ASU pushed me through structured systems and
                  security labs that overlap directly with pwn.college content.
                  That coursework has helped me bridge the yellow and green
                  belt material by reinforcing exploit fundamentals, debugging
                  discipline, and real-world attack surfaces.
                </p>
                <h3>Yellow and Green Belt Skills</h3>
                <ul>
                <li>Advanced Reverse Engineering with Yan85 (custom programming language that uses random opcode and syscall mappings on each challenge)</li>
                <li>Return Oriented Programming</li>
                <li>Dynamic Allocator Misuse</li>
                <li>Sandbox Escapes</li>
                <li>Race Conditions</li>
                <li>Kernel Exploits</li>
                <li>Microarchitecture Exploits (branch predictor and page walk related)</li>
                </ul>
            </div>
            <div className="section-card">
              <h3>Next Targets</h3>
              <ul>
                <li>Finish Yellow and Green belt</li>
                <li>Blue belt topics such as advanced heap techniques, kernel-adjacent concepts, string format exploits, etc.</li>
                <li>Consistent CTF practice with the CTF Academy and whenever possible</li>
                <li>Deeper reverse engineering workflows and tooling for practice</li>
              </ul>
              <div
                className={`belt-progress ${beltProgressVisible ? 'is-visible' : ''}`}
                ref={beltProgressRef}
              >
                <div className="belt-progress-row">
                  <div className="belt-progress-label">
                    <img className="belt-placeholder" src={orangeB}/>
                    <span>Orange Belt</span>
                  </div>
                  <div className="belt-progress-track">
                    <div className="belt-progress-fill belt-orange" style={{ '--target': '100%' }} />
                  </div>
                  <span className="belt-progress-value">100%</span>
                </div>
                <div className="belt-progress-row">
                  <div className="belt-progress-label">
                    <img className="belt-placeholder" src={yellowB}/>
                    <span>Yellow Belt</span>
                  </div>
                  <div className="belt-progress-track">
                    <div className="belt-progress-fill belt-yellow" style={{ '--target': '100%' }} />
                  </div>
                  <span className="belt-progress-value">100%</span>
                </div>
                <div className="belt-progress-row">
                  <div className="belt-progress-label">
                    <img className="belt-placeholder" src={greenB} />
                    <span>Green Belt</span>
                  </div>
                  <div className="belt-progress-track">
                    <div className="belt-progress-fill belt-green" style={{ '--target': '65%' }} />
                  </div>
                  <span className="belt-progress-value">65%</span>
                </div>
                <div className="belt-progress-row">
                  <div className="belt-progress-label">
                    <img className="belt-placeholder" src={blueB} />
                    <span>Blue Belt</span>
                  </div>
                  <div className="belt-progress-track">
                    <div className="belt-progress-fill belt-blue" style={{ '--target': '6%' }} />
                  </div>
                  <span className="belt-progress-value">6%</span>
                </div>
              </div>
              <p><br/>Last Update: 5/8/2026</p>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-section codeProjects" ref={codeProjectsRef}>
        <div className="section-content">
          <div className="section-header">
            <h2>Code Projects</h2>
            <p className="section-summary">
              Projects focused on readable architecture, testable logic, and polished interaction design through classwork and personal projects.
            </p>
          </div>
          <div className="section-grid">
            <div className="section-card">
              <h3>Graph Algorithms Playground</h3>
              <p>
                Interactive shortest-path visualization with clear controls and
                predictable animation.
              </p>
            </div>
            <div className="section-card">
              <h3>Portfolio Platform</h3>
              <p>
                A React-based showcase for data, security, and software
                engineering work with modular components.
              </p>
            </div>
            <div className="section-card">
              <h3>Data + Security Programming</h3>
              <p>
                Exploit development in python, machine learning for classes, and other projects
              </p>
            </div>
          </div>

          <div className="graph-visualization">
            <div className="graph-header">
              <h3>Graph Visualization Demo</h3>
              <p className="section-summary">
                Run Dijkstra to watch shortest-path discovery for the selected
                graph dataset.
              </p>
            </div>
            <div className="graph-controls">
              <label htmlFor="file-select">Graph file:</label>
              <select
                id="file-select"
                onChange={(event) => setSelectedFile(event.target.value)}
                value={selectedFile}
              >
                <option value={graph1}>Weighted Directed</option>
                <option value={graph2}>Unweighted Directed</option>
                <option value={graph3}>Weighted Undirected</option>
                <option value={graph4}>Unweighted Undirected</option>
              </select>
            </div>
            <GraphVisualization filePath={selectedFile} />
          </div>
        </div>
      </section>

      <section className="portfolio-section kaggleSection" ref={kaggleRef}>
        <div className="section-content">
          <div className="section-header">
            <h2>Kaggle Learning</h2>
            <p className="section-summary">
              Another thing I do in my free time is get Kaggle certifications to build my data science and professional skills
            </p>
          </div>
          <div className="section-grid">
            <div className="section-card">
              <h3>Done so far</h3>
              <ul>
                <li>Exploratory data analysis with Python and pandas</li>
                <li>Feature engineering, model selection, and evaluation</li>
                <li>SQL-driven analysis for real-world data shaping</li>
                <li>Clear narrative write-ups and visual storytelling</li>
              </ul>
            </div>
            <div className="section-card certs">
              <div className="cert">
                <img className="sqlcert" src={sqlCertK} alt="SQL Certificate" />
                <p>Intro to SQL Certification</p>
              </div>
              <div className="cert">
                <img className="pandascert" src={pandasCertK} alt="Pandas Certificate" />
                <p>Pandas Certification</p>
              </div>
            </div>
            <div className="section-card">
              <h3>Professional Practices</h3>
              <ul>
                <li>Versioned notebooks and documented experiments</li>
                <li>SQL for data retreival</li>
                <li>Pandas library in Python for data analysis</li>
                <li>Baseline models plus iterative improvements</li>
                <li>Attention to leakage, bias, and evaluation metrics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Loader type="pacman" />
    </>
  )
}

function Helper() {
  const { setGlobalState } = useContext(Context)
  const [formState, setFormState] = useState({ firstname: '', lastname: '' })

  const handleChange = (field, value) => {
    setFormState((old) => ({ ...old, [field]: value }))
  }

  const handleAddPerson = () => {
    const firstname = formState.firstname.trim()
    const lastname = formState.lastname.trim()

    if (!firstname && !lastname) {
      return
    }

    setGlobalState((old) => [
      ...old,
      {
        firstname,
        lastname,
        setkey: uuidv4()
      }
    ])

    setFormState({ firstname: '', lastname: '' })
  }

  return (
    <div className="listInputs">
      <label htmlFor="first">First name</label>
      <input
        placeholder="Enter first name"
        id="first"
        type="text"
        value={formState.firstname}
        onChange={(event) => handleChange('firstname', event.target.value)}
      />

      <label htmlFor="last">Last name</label>
      <input
        placeholder="Enter last name"
        id="last"
        type="text"
        value={formState.lastname}
        onChange={(event) => handleChange('lastname', event.target.value)}
      />

      <button type="button" className="addButton" onClick={handleAddPerson}>
        Add
      </button>
    </div>
  )
}

export default Portfolio
