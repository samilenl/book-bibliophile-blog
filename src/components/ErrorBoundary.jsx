import { Link } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

const ErrorBoundary = () => {
  return (
    <>
      <Header/>
      <div className="container">
        <div className="content">
          <h2 className="errr">404 Page Not Found</h2>
          <Link to={'/'}>Go to Home Page</Link>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default ErrorBoundary