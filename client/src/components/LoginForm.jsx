import React, { useState } from "react";

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await onLogin(email, password);
        } catch (err) {
            console.error("Login error:", err);
            setError("Login failed. Please check credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
        Email
        </label>
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="admin@example.com"
        required
        />
        </div>

        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
        Password
        </label>
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="admin123"
        required
        />
        </div>

        {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            {error}
            </div>
        )}

        <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
        {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-sm text-gray-500 text-center mt-4">
        <p>Use these credentials:</p>
        <p className="font-mono">admin@example.com</p>
        <p className="font-mono">admin123</p>
        </div>
        </form>
    );
};

export default LoginForm;
