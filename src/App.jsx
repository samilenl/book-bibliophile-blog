import Header from "./components/Header"
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom"

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
          <div className="content">
            <Outlet/>
          </div>
      </div>
      <Footer />
    </>
  )
}

export default App
