//Nathan Svoboda
//5 / 21 / 2024
//Purpose: Learning React through practice and developing based on a tutorial on scrimba
import { Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Layout from './components/Layout'
import './App.scss'
import Portfolio from './components/Portfolio'
//query selector would also work since you are essentially creating a root,
//and then rendering to that using an element that is written in the html code below
//"element" is what I want to render, and "root" is where I want to do it (<h1> is for header, <p> is for paragraph)
//root.render(element);
//root.render(reasons);
//more javascript way to do things, more imparative since react can do that too
//also appends on every change, kinda also shows the DOM demonstration of changes

// const h1 = document.createElement("h1")
// h1.textContent = "This is a very imparative way to program things"
// h1.className = "header"
// document.getElementById("root").append(h1)

//always runs this and is kinda global since it is always exported
//the elements became centered as well.
//jsx renders the object
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route path='portfolio' index element={<Portfolio />} />
          <Route path='home' index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  )
}
//rendering just the elements with a div means that the state is lost upon refreshing, moving it to a constant fixes that

//(below is just for practice)
//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<App/>);
export default App;