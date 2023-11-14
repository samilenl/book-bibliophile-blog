import { NavLink, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import "../assets/styles/Header.css"
import logo from "../assets/images/logo.svg"

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(()=>{
    const checkUserAuth = async() => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`https://book-bilbliophile-api.up.railway.app/check-auth`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })
        if (response.status === 401) {
          return setLoggedIn(false)
        }
        const user = await response.json()
        if (user.authenticated) {
          setLoggedIn(true)
        } 
        else {
          setLoggedIn(false)
        }
      } 
      catch (error) {
        console.log(error)
      }
    }
    checkUserAuth()
  }, [])

  const logout = async() => {
    localStorage.removeItem("token")
    setLoggedIn(false)
  }

  const LogInOut = () => {
    if (loggedIn === false) {
      return (
        <div className="loginReg">
          <NavLink to={"/login"} className={"hdr-nav"}> Login </NavLink>
          <NavLink to={"/register"} className={"hdr-nav reg"}> Register </NavLink>
        </div>
      )
    }
    else if (loggedIn === true) {
      return <button onClick={logout} className="hdr-nav logout">Logout</button>
    }
  }

  return (
    <header>
        <Link to={'/'}><img className="logo" src={logo} /></Link>
        <div className="menu">
          <NavLink to={"/"} className={"hdr-nav"} > Home </NavLink>
          <NavLink to={"/posts"} className={"hdr-nav"} > Posts </NavLink>
          <NavLink to={"/topics"} className={"hdr-nav"}> Topics </NavLink>
          <LogInOut />
        </div>
        <div className={`nav-icon-5 ${isOpen ? 'open' : ''}`} onClick={()=>setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {
          isOpen && <div className="mobile-menu">
            <NavLink to={"/"} className={"hdr-nav"} > Home </NavLink>
            <NavLink to={"/posts"} className={"hdr-nav"} > Posts </NavLink>
            <NavLink to={"/topics"} className={"hdr-nav"}> Topics </NavLink>
            <LogInOut />
          </div>
        }
    </header>
  )
}

export default Header