const fs = require("fs-extra");
const path = require("path");
const bcrypt = require("bcryptjs");

async function fixPasswords() {
    const dataDir = path.join(__dirname, "data");
    const usersPath = path.join(dataDir, "users.json");
    
    // Create fresh user with correct password
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const users = [{
        id: 1,
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin"
    }];
    
    await fs.ensureDir(dataDir);
    await fs.writeJson(usersPath, users);
    
    console.log("✅ Password fixed. New hash created.");
    console.log("Email: admin@example.com");
    console.log("Password: admin123");
}

fixPasswords().catch(console.error);
