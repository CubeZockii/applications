import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Feste Admin-Zugangsdaten (kann später durch eine Datenbank ersetzt werden)
const ADMIN_CREDENTIALS = { username: "admin", password: "supersecurepassword" };

app.post("/admin/login", (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        res.json({ success: true, token: "secureAdminToken123" });
    } else {
        res.json({ success: false });
    }
});

// Server starten
app.listen(3000, () => console.log("Server running on http://localhost:3000"));