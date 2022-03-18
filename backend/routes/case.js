require("dotenv").config();
const jwt = require('jsonwebtoken')
const caseController = require('../controllers/case.js')

const router = require('express').Router()


// routes
router.post('/addCase', middleware, caseController.addCase)
router.get('/getCases', caseController.getAllCases)
router.delete('/deleteCase/:id', caseController.deleteCase)
router.put('/updateCase/:id', middleware, caseController.updateCase)
router.post('/searchCase', middleware, caseController.searchCase)

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

module.exports = router
