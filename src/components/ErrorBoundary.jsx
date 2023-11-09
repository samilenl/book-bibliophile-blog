import { Link } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

const ErrorBoundary = () => {
  return (
    <>
      <Header/>
      <h2>404 Page Not Found</h2>
      <Link to={'/'}>Go to Home Page</Link>
      <Footer/>
    </>
  )
}

export default ErrorBoundary