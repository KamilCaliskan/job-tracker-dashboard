import { useState } from "react";
import axios from "axios";

export default function LoginForm({ setToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/login", { email, password });
            setToken(res.data.token);
            setError("");
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-2">
        {error && <p className="text-red-500">{error}</p>}
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </form>
    );
}
