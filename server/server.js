const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv')
const Cors = require('cors');
const User = require('./model/User.js')
const app = express();
const traineeRoutes = require('./traineeRoutes.js')
const expensesRoutes = require('./expensesRoutes.js')

dotenv.config()
app.use(Cors())

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/hustlemuscle", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));




// Login Route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (!password) {
        return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });
});




app.use('/api/trainees', traineeRoutes)
app.use('/api/expenses', expensesRoutes);


// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
