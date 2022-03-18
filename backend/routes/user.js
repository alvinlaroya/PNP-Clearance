require("dotenv").config();
const jwt = require('jsonwebtoken')
const user = require("../controllers/user.js");

const router = require("express").Router();

// routes
router.post("/register", user.registerUser);
router.post("/login", user.authenticateUserWithemail);
router.post("/currentUser", middleware, user.getAuthenticatedUser);
router.get("/getUsers", middleware, user.getAllUsers);
router.put('/updatePersonnel/:id', user.updatePersonnel)

function middleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_JWT_KEY, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
