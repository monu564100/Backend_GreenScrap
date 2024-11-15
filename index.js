const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const postRoutes = require("./routes/posts");

dotenv.config(); // Make sure this is called at the top
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const CONNECTION_URL = process.env.CONNECTION_URL; // Make sure this matches your .env variable name

if (!CONNECTION_URL) {
    console.error("MongoDB connection string is missing in .env file");
    process.exit(1);
}

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
    res.send("Hello to Tap-Waste");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
