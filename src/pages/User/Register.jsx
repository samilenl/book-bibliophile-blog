import { useState } from "react"
import { Link } from "react-router-dom"
import "../../assets/styles/User.css"


const Register = () => {
  const [user, setUser] = useState({name:"", email: "", password: "", confirmPassword: ""})
  const [message, setMessage] = useState("")

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email: user.email, 
          password: user.password,
          confirmPassword: user.confirmPassword,
          name: user.name
        })
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
          Name
          <input type="text" name="name" onChange={(e)=>{

            setUser((prevState)=>({
              ...prevState,
              name: e.target.value
            }))
          }}/>
        </label>
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
        <label>
          Confirm Password
          <input type="password" name="confirm-password" onChange={(e)=>{setUser((prevState)=>({
            ...prevState,
            confirmPassword: e.target.value
          }))}}/>
        </label>
        <button type="submit" onClick={handleSubmit}>Submit</button>
        <p className="otherr">
          Already have an account? 
          <span className="other-option"> <Link to={'/login'}> Login </Link> </span> 
          or 
          <span className="other-option"><Link to={"/"}> Go to Home Page </Link> </span>
        </p> 
    </div>
  )
}

export default Register