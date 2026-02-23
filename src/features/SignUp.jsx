import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { signUp, getUserEmail, isAuthenticated } from "../service/authService";


export default function SignUp() {
  const navigate = useNavigate();
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

   const [form, setForm] = useState({ 
    email: "",
    username: "",
    password: "" ,
});

const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
}

const handleSubmit = async (e) => {
    console.log("SUBMIT FIRED");
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        await signUp({
            username: form.username,
            email: form.email,
            password: form.password,
        });
        
        navigate("/todolist");
    } catch (e) {
        isAuthenticated() && getUserEmail() === form.email
            ? setError("User already exists. Please log in.")
            : setError("Error signing up: " + e.message);
} 
finally {
    setLoading(false);
}
};




  /*function handleSubmit(e) {
    e.preventDefault();
    signUp(form.username, form.email, form.password);
    navigate("/todolist");
  }
     function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }*/

return (
    <div className="login-page">
        <div className="login-card">
            <h1>'*' Required</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email*"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    name="username"
                    type="text"
                    placeholder="Username*"
                    value={form.username}
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password*"
                    value={form.password}
                    onChange={handleChange}
                />
                <div className="login-actions">
                    <button type="submit"
                    disabled={loading}
                    >Sign up</button>
                    <Link to={'/login'}>Back to login</Link>
                </div>
            </form>
        </div>
    </div>
);
}