const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv')
const cors = require('cors');
const User = require('./model/User.js')
const app = express();
const traineeRoutes = require('./Routes/traineeRoutes.js')
const expensesRoutes = require('./Routes/expensesRoutes.js')
const trainersRoutes = require('./Routes/trainersRoutes.js')
const settingsRoutes = require('./Routes/settingsRoutes.js')

dotenv.config();


app.use(cors())


const PORT = process.env.PORT;
const uri = process.env.DB_URI;
app.use(bodyParser.json());

// MongoDB connection


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));





app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Log the request body
    console.log("Request body:", req.body);

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Log the username being searched
    console.log("Searching for user:", username);

    const user = await User.findOne({ username });
    const users = await User.find()
    // Log the user found (or not found)
    console.log("User found:", user);

    if (!user) {
        console.log(users)
        return res.status(404).json({ message: "user not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Log password comparison result
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });
});

app.use('/api/trainees', traineeRoutes)
app.use('/api/expenses', expensesRoutes);
app.use('/api/trainers', trainersRoutes)
app.use('/api/settings', settingsRoutes)

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
