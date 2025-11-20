import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
// import About from './pages/About'
// import Blog from './pages/Blog'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} /> */}
        </Routes>
      </main>
    </div>
  )
}

export default App