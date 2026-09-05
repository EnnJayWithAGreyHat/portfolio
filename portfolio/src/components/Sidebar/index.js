import './index.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLinkedin,
  faGithub,
  faRaspberryPi
} from '@fortawesome/free-brands-svg-icons'
import {
  faHome,
  faUser,
  faEnvelope,
  faSuitcase
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="nav-bar">
      <div className="logo">
      </div>

      <nav>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? 'active' : undefined)}
        >
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'active' : undefined)}
        >
          <FontAwesomeIcon icon={faUser} />
        </NavLink>
        <NavLink
          to="/portfolio"
          className={({ isActive }) => (isActive ? 'active' : undefined)}
        >
          <FontAwesomeIcon icon={faSuitcase} />
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? 'active' : undefined)}
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </NavLink>
      </nav>

      <ul>
        <li>
          <a
            href="https://www.linkedin.com/in/nathan-svoboda/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="anchor-icon"
            />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/EnnJayWithAGreyHat"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="anchor-icon"
            />
          </a>
        </li>
        <li>
          <a
            href="https://pwn.college/hacker/64420"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faRaspberryPi}
              className="anchor-icon"
            />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
