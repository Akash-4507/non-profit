require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('./config/server'); 
const service=require('./routes/donationRoute')
const donation=require('./routes/donationRoute')
const contact=require('./routes/contactRoute')
const blog=require('./routes/blogRoute')
const event=require('./routes/eventRoute')


const app = express();
app.use(express.json());
app.use(cors());

app.use('/service',service)
app.use('/donation',donation)
app.use('event',event)
app.use('/blog',blog)
app.use('/contact',contact)

const port = process.env.PORT || 8888;

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello world" });
});


app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
});
