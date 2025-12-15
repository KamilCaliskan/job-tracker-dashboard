import React, { useState } from "react";

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState("admin@example.com");
    const [password, setPassword] = useState("admin123");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("🔍 LOGINFORM DEBUG:");
        console.log("  - Email input value:", email);
        console.log("  - Password input value:", password);
        console.log("  - onLogin function type:", typeof onLogin);
        console.log("  - Calling: onLogin(email, password)");
        console.log("  - Parameters being sent:", { email, password });
        
        setLoading(true);
        
        // TRIPLE-CHECK: We're calling with TWO parameters
        onLogin(email, password);
        
        setLoading(false);
    };

    return (
        <div className="border-2 border-blue-500 p-4 rounded-lg bg-blue-50">
            <h3 className="text-lg font-bold text-blue-700 mb-4">DEBUG MODE - LoginForm</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email (Check console)
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border-2 border-blue-300 rounded-lg px-4 py-2"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password (Check console)
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border-2 border-blue-300 rounded-lg px-4 py-2"
                        required
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-bold"
                >
                    {loading ? "Testing..." : "CLICK & CHECK CONSOLE"}
                </button>
            </form>
            
            <div className="mt-4 p-3 bg-yellow-100 rounded text-sm">
                <p className="font-bold">After clicking button:</p>
                <p>1. Open Console (Ctrl+Shift+I)</p>
                <p>2. Check for "🔍 LOGINFORM DEBUG" messages</p>
                <p>3. Look for "✅ App.js: handleLogin CALLED with:"</p>
            </div>
        </div>
    );
};

export default LoginForm;
