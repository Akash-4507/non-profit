const mongoose = require('mongoose');
require('dotenv').config(); // Ensure dotenv is loaded here to access env variables

// Connect to MongoDB without deprecated options
mongoose.connect(process.env.MONGOURL)
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.error("DB connection error:", err);
    });

module.exports = mongoose;
