import { useState } from "react"
import { Link } from "react-router-dom"


const Login = () => {
  const [user, setUser] = useState({email: "", password: ""})
  const [message, setMessage] = useState("")

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://book-bilbliophile-api.up.railway.app/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: user.email, password: user.password })
      });
  
      const data = await response.json();
      if (data.message) {
        setMessage(data.message)
      }
      else if (data.token){
        localStorage.setItem("token", data.token)
        window.location.replace("/")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="get-in">
        { message && <p className="get-in-error">{message}</p> }
        <label>
          E-mail
          <input type="email" name="email" onChange={(e)=>{setUser((prevState)=>({
            ...prevState,
            email: e.target.value
          }))}}/>
        </label>
        <label>
          Password
          <input type="password" name="password" onChange={(e)=>{setUser((prevState)=>({
            ...prevState,
            password: e.target.value
          }))}}/>
        </label>
        <button type="submit" onClick={handleSubmit}>Submit</button>
        <p>
          Don{"'"}t have an account? 
          <span className="other-option"><Link to={'/register'}> Register </Link> </span> 
          or 
          <span className="other-option"><Link to={"/"}> Go to Home Page </Link> </span>
          </p>
    </div>
  )
}

export default Login