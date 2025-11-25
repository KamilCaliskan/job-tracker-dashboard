import jwt from "jsonwebtoken";

export const login = (req, res) => {
    const { email, password } = req.body;

    if (email !== "test@test.com" || password !== "123456") {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    res.json({ token });
};
