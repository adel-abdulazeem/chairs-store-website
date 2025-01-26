const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const cron = require("node-cron");


const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const menuRoute = require('./routes/menu')
const cartRoute = require('./routes/cart')
const submitOrderRoute = require('./routes/submitOrder')
const orderRoute = require('./routes/order')
//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use('/menu', menuRoute)
app.use('/cart', cartRoute)
app.use('/order', orderRoute)
app.use('/submitOrder', submitOrderRoute)

// Function to check server health
const checkServerHealth = async () => {
  try {
    const response = await fetch(`https://chairs-store-website.onrender.com/menu/showDetails/6686821a03a9150ac85d47ba`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Server health check successful:", data);
  } catch (error) {
    console.error("Server health check failed:", error.message);
  }
};
// Schedule health check every 5 minutes
cron.schedule("*/5 * * * *", () => {
  console.log("Running health check...");
  checkServerHealth();
});
//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
