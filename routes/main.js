const express = require("express");
const router = express.Router();
const countController = require('../controllers/cartCount');

const authController = require("../controllers/auth");
const homeController = require("../controllers/home");

router.use(countController.computeCartItemCount)


 
//Main Routes - simplified for now
router.get("/", homeController.getIndex);


//Routes for user Login/signup
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
