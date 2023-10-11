const express = require('express');

const mongoose = require ('mongoose');

const {MONGO_URI} = require ('./config');

// Routes
const postsRoutes = require ('./routes/api/Posts.js'); 


var cors = require('cors');
const app = express();

//BodyParser Middleware
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5001;

// Connect to Mongo DB
mongoose.connect(MONGO_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
    .then(()=> console.log('MongoDB connected!'))
    .catch(err => console.log(err));

// User Routes
app.use('/api/posts', postsRoutes);

app.listen(PORT, ()=>
    console.log(`Server run at port ${PORT}`)
);