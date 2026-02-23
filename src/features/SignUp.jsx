import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";


export default function SignUp() {
  const navigate = useNavigate();

   const [form, setForm] = useState({ 
    firstname: "",
    email: "",
    username: "",
    password: "" ,
    confirmPassword: "",
});




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
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    name="firstname"
                    type="text"
                    placeholder="First Name"
                    value={form.firstname}
                    onChange={handleChange}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                />
                <div className="login-actions">
                    <button type="submit">Sign up</button>
                    <Link to={'/login'}>Back to login</Link>
                </div>
            </form>
        </div>
    </div>
);
}