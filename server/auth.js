import jwt from "jsonwebtoken";
import fs from "fs-extra";
import bcrypt from "bcryptjs";

const SECRET = "My23SuperScrtRandomKey123!@#
";

const usersFile = "./data/users.json";

export const login = async (req, res) => {
    const { email, password } = req.body;
    const users = await fs.readJSON(usersFile);

    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });
    res.json({ token });
};

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};
