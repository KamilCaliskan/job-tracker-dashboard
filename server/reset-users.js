const fs = require('fs-extra');
const path = require('path');
const bcrypt = require('bcryptjs');

async function resetUsers() {
    const dataDir = path.join(__dirname, "data");
    const usersPath = path.join(dataDir, "users.json");
    
    // Create simple user with plain text password (no hashing)
    const users = [{
        id: 1,
        email: "admin@example.com",
        password: "admin123",  // Plain text for testing
        role: "admin"
    }];
    
    await fs.ensureDir(dataDir);
    await fs.writeJson(usersPath, users);
    
    console.log("✅ Users reset. Using plain text password.");
    console.log("Email: admin@example.com");
    console.log("Password: admin123");
}

resetUsers().catch(console.error);
