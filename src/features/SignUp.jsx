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


    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const Parse = window.Parse;
    if (!Parse) {
        setLoading(false);
        setError("Error with Parse");
        return;
    }
    try {
        const newUser = await register({username,email,password});
        console.log("Succes signing up user: ", newUser);
        navigate("/todolist");
    } catch (e) {
        console.log("Failed signing up: ", e);
        setError(e?.message??"Sign up failed");
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
                    placeholder="Password*"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
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