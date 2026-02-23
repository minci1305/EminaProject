import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

export default function LogIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();


  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // later: validate + call backend
    navigate("/todolist");
  }


  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome back!</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <div className="login-actions">
            <button type="submit">Log in</button>
            <Link to="/signup">Don't have a user? Click here to sign up!</Link>
          </div>
        </form>
      </div>
    </div>
  );
}