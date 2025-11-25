import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/login", { email, password });
            onLogin(res.data.token);
        } catch {
            setErr("Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleLogin} className="max-w-sm bg-white p-4 rounded shadow">
        <input className="w-full border p-2 mb-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
        <input className="w-full border p-2 mb-2" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="password" />
        {err && <div className="text-red-600 mb-2">{err}</div>}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </form>
    );
};

export default LoginForm;
