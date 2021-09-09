require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');


mongoose
  .connect('mongodb://localhost/starter-code', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
 

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// require session
const session = require('express-session');

// ADDED: require mongostore
const MongoStore = require('connect-mongo');

app.use(
  session({
    secret: 'doesnt matter',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }, // 10 minutes
    store: MongoStore.create({
      // <== ADDED !!!
      mongoUrl: "mongodb://localhost/starter-code"
     
    })
  })
);

// default value for title local
app.locals.title = 'Easyshopping.com';




const index = require('./routes/index');
app.use('/', index);

const electroRoutes = require("./routes/electronics");
app.use("/electronics", electroRoutes);

const clothsRoutes = require("./routes/cloths");
app.use("/cloths", clothsRoutes);

const authRouter = require('./routes/auth.routes');
app.use('/', authRouter);

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv

// ℹ️ Connects to the database
//require('./db');


// Handles http requests (express is node js framework)




// ℹ️ This function is getting exported from the config folder. It runs most middlewares
//require('./config')(app);







// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
//require('./error-handling')(app);

module.exports = app;