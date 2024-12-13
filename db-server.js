/* server.js
 * Express server for user_accounts management
 */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");

// Server files from public directory
app.use(express.static("public"));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Function to create a database connection
function createConnection() {
    return mysql.createConnection({
        host: "127.0.0.1",
        user: "fef",
        password: "$10311FAf",
        database: "FetchYourFriendDB"
    });
}

// Endpoint: Create a new user account
app.post("/create-account", async (req, res) => {
    const { name, email, username, password_hash } = req.body;
    const conn = createConnection();

    try {
        await conn.connect();

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password_hash, saltRounds);

        const sql = `INSERT INTO user_accounts (name, email, username, password_hash) VALUES (?, ?, ?, ?)`;
        conn.query(sql, [name, email, username, hashedPassword], (err, result) => {
            if (err) {
                console.error("Error inserting user:", err);
                res.status(500).send({ message: "Error creating account." });
            } else {
                res.status(201).send({ message: "Account created successfully!", user_id: result.insertId });
            }
        });
    } catch (error) {
        console.error("Error handling create-account:", error);
        res.status(500).send({ message: "Error creating account." });
    } finally {
        conn.end(); // Close the connection
    }
});

// Endpoint: Validate user login
app.post("/validate-login", async (req, res) => {
    const { credential, password } = req.body;
    const conn = createConnection();

    try {
        await conn.connect();

        const sql = `SELECT * FROM user_accounts WHERE email = ? OR username = ?`;
        conn.query(sql, [credential, credential], async (err, results) => {
            if (err) {
                console.error("Error querying database:", err);
                res.status(500).send({ message: "Error validating login." });
            } else if (results.length > 0) {
                const storedHash = results[0].password_hash;

                try {
                    const isMatch = await bcrypt.compare(password_hash, storedHash);
                    if (isMatch) {
                        res.status(200).send({ 
                            message: "Login successful!", 
                            user_id: results[0].user_id 
                        });
                    } else {
                        res.status(401).send({ message: "Invalid username/email or password." });
                    }
                } catch (error) {
                    console.error("Error comparing password hashes:", error);
                    res.status(500).send({ message: "Error validating login." });
                }
            } else {
                res.status(404).send({ message: "User not found." });
            }
        });
    } catch (error) {
        console.error("Error handling validate-login:", error);
        res.status(500).send({ message: "Error validating login." });
    } finally {
        conn.end(); // Close the connection
    }
});

// Endpoint: Get user info for the profile page
app.get("/user-info/:user_id", (req, res) => {
    const { user_id } = req.params;
    const conn = createConnection();

    try {
        conn.connect((err) => {
            if (err) {
                console.error("Error connecting to database:", err);
                res.status(500).send({ message: "Error fetching user info." });
                return;
            }

            const sql = `SELECT name, email, username, liked_pets FROM user_accounts WHERE user_id = ?`;
            conn.query(sql, [user_id], (err, results) => {
                if (err) {
                    console.error("Error fetching user info:", err);
                    res.status(500).send({ message: "Error fetching user info." });
                } else if (results.length > 0) {
                    res.status(200).send(results[0]);
                } else {
                    res.status(404).send({ message: "User not found." });
                }
                conn.end(); // Close the connection
            });
        });
    } catch (error) {
        console.error("Unexpected error in get-user-info:", error);
        res.status(500).send({ message: "Unexpected error." });
        conn.end(); // Ensure connection is closed
    }
});

// Start the server on port 3809
app.listen(3809, () => {
    console.log("Server running on port 3809.");
});
