require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('./config/server'); 

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8888;

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello world" });
});


app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
});
