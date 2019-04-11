const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// body parser middleware
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// app logger
app.use(logger('dev'));

//db config
const db = require('./config/keys').mongoURI;

//mongodb connection
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(() => console.log('Conncetion error'));

app.get('/', (req,res) => res.send('hello'));

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport.js')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));