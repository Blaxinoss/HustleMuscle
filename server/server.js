const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv')
const Cors = require('cors');
const User = require('./model/User.js')
const app = express();
const traineeRoutes = require('./Routes/traineeRoutes.js')
const expensesRoutes = require('./Routes/expensesRoutes.js')
const trainersRoutes = require('./Routes/trainersRoutes.js')

app.use(Cors());
dotenv.config();


const PORT = process.env.PORT;
const uri = process.env.DB_URI;
app.use(bodyParser.json());

// MongoDB connection

mongoose.connect(uri, {
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

app.get('/', (req, res) => {
    res.send('Hello, world!'); // Sends a response to the client
});

app.use('/api/trainees', traineeRoutes)
app.use('/api/expenses', expensesRoutes);
app.use('/api/trainers', trainersRoutes)

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
