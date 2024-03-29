const express = require('express');
const mongoose = require('mongoose');
const authRouters = require('./routers/authRouters');
const cookieParser = require('cookie-parser');
const {requireAuth,checkUser} = require('./middleware/authMiddleware');
require("dotenv").config();

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
// const dbURI = `mongodb+srv://ankit_git:${process.env.MONGODB_PASSWORD}@cluster0.mhfgtgs.mongodb.net/node-auth?retryWrites=true&w=majority`;
const dbURI = `mongodb+srv://bhavyathakkar96:${process.env.MONGODB_PASSWORD}@cluster0.01nbbph.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    app.listen(4000)})
  .catch((err) => console.log(err));
    console.log("The server is now running on local port visit the http://localhost:4000/");

// routes
app.get('*',checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/private',requireAuth, (req, res) => res.render('private'));
app.use(authRouters);
app.get('/dino',requireAuth,(req,res)=>{
    res.render('index');
});
app.get('/menja',requireAuth,(req,res)=>{
    res.render('menja');
});
app.get('/book',requireAuth,(req,res)=>{
    res.render('book');
});
app.get('/plane',requireAuth,(req,res)=>{
    res.render('plane');
});
app.get('/stack',requireAuth,(req,res)=>{
    res.render('stack');
});




//
app.get('/StickHero',requireAuth,(req,res)=>{
    res.render('stickHero');
});
app.get('/Tetris',requireAuth,(req,res)=>{
    res.render('Tetrisindex');
});
app.get('/highwayrace',requireAuth,(req,res)=>{
    res.render('highwayindex');
});
app.get('/snake',requireAuth,(req,res)=>{
    res.render('snakeindex');
});
app.get('/bounce',requireAuth,(req,res)=>{
    res.render('bounceindex');
});

