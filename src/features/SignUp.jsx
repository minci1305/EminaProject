import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { register } from "../service/authService";


export default function SignUp() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    //handles the form submission for user registration, manages loading state 
    //displays error messages based on the response from the registration service
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password.length < 5) {
           setError({"password":"Password must be at least 6 characters."}); 
            return;
        }

       setLoading(true);

    try {
        const newUser = await register({username,email,password});
        console.log("Succes signing up user: ", newUser);
        navigate("/todolist");
    } catch (error) {
        if (error.code === 202) {
            setError({"email": "Email already exists."});
            console.log("Failed signing up: ", error);
        } else if (!password || password.trim() === 0) {
            setError({"password": "Password is required."});
            console.log("Failed signing up: ", error);
        }  else {
            setError(error?.message??"Sign up failed");
            console.log("Failed signing up: ", error);
        }
    } finally {
    setLoading(false);
    }
}

return (
    <div className="login-page">
        <div className="login-card">
            <h2>'*' Required</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    name="username"
                    type="text"
                    placeholder="Username*"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password* (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error">{error.password || error.email || error}</p>}
                <div className="login-actions">
                    <button type="submit" disabled={loading}>
                    {loading ? "Signing up..." : "Sign up"}
                    </button>
                    <Link to={'/'}>Back to login</Link>
                </div>
            </form>
        </div>
    </div>
);
}