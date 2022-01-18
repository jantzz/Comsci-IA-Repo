const express = require('express');
const passport = require("passport");
const body_parser = require("body-parser");
const User = require("./models/User.js");
const app = express();
const path  = require('path');

app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views',path.join(__dirname,"views"));

// Session handling 
app.use(require("express-session")({
    secret: "Portal_Test",
    resave: false,
    saveUninitialized: false
}));

//Routes
app.get('/' , (req, res) => {
    res.redirect("/welcome");
})

app.get('/welcome' , (req, res) => { 
    res.render('welcome');
})

app.get('/index' , (req, res) => {
    res.render('index');
})

//Register
app.get('/register', (req, res) => { 
    res.render('register');
})

//Registration handling
app.post("/register", function (req, res) {
   try{ let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let role = "user";
    let status = "pending";
    User.create({ username: username, password, email, role, status })}
    catch(error){
        res.send(error);
    }
  });

//Login Form
app.get("/login", (req, res) => {
    res.render("login");
  });
  
//Login 
app.post("/login", passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login"
  }), (req, res) => {
});
  
//Logout 
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

// Functions 

function LoggedIn(req, res, next){
    if(req.isAuthenticaed()){
        return next();
    } else{
        res.redirect('/login');
    }
 }

function Admin(req, res, next){
    if(req.user.role == "Admin"){
        return next();
    } else{
        res.redirect('/login');
    }
}

app.listen(3000);