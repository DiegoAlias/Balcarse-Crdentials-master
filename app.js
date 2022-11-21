const express = require("express");
const morgan = require("morgan");
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const bodyParser = require("body-parser");
const path = require("path");
const MySQLStore = require('express-mysql-session')(session);

const server = require("./config.js")
const routes = require("./routes/user-routes");
const routesAuth = require("./routes/authentication");
const { database } = require('./database');

const app = express();
require('./lib/passport');

//Settings
app.set('view engine', 'hbs');

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'balcarseMedicalCenter',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
  }));

app.use(passport.initialize());
app.use(passport.session());
app.use(validator());

//Routes
app.use("/",routes);
app.use("/",routesAuth);


app.listen (3000, () =>{
    console.log("app on port ", server.port);
})


