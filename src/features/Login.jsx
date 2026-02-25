import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { logIn} from "../service/authService";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

//destructures the event object to get the name and value of the input field, 
//updates the corresponding state based on the inputs name (email or password)
 function handleChange(e) {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  //handles login submission and manages loading state
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
  
        try {
            await logIn({email, password});
            navigate("/todolist");
        } catch (error) {
          if (error.code === 101) {
            setError("Invalid email or password.");
          } else {  
            setError("Error logging in: " + error.message);
          }
      } finally {
        setLoading(false);
    }
  }


  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Log In</h1>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />

          <div className="login-actions">
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </button>
            <Link to="/signup">Don't have a user? Click here to sign up!</Link>
          </div>
        </form>
      </div>
    </div>
  );
}