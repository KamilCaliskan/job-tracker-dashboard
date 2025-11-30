import jwt from "jsonwebtoken";
import fs from "fs-extra";
import bcrypt from "bcryptjs";

// Secret key for JWT — keep this safe in production, e.g., in .env
const SECRET = "My23SuperScrtRandomKey123!@#";

// Path to your users.json file
const usersFile = "./data/users.json";

/**
 * Login endpoint
 * Checks email & password and returns a JWT token
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Load all users from JSON
        const users = await fs.readJSON(usersFile);

        // 🔹 Debug logs to understand flow
        console.log("Trying login:", email, password);
        console.log("Users loaded:", users);

        // Find user by email
        const user = users.find((u) => u.email === email);
        console.log("User found:", user);

        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        // Compare plain password with hashed password
        const valid = bcrypt.compareSync(password, user.password);
        console.log("Password valid:", valid);

        if (!valid) return res.status(401).json({ message: "Invalid credentials" });

        // Sign JWT token with user info
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            token,
            user: { id: user.id, email: user.email, role: user.role },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Authentication middleware
 * Verifies JWT token from Authorization header
 */
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1]; // Extract token

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded; // ✅ Includes id, email, role
        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        res.status(401).json({ message: "Invalid token" });
    }
};
