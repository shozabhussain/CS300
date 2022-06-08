const express = require('express');
const CoursesCtrl =require("../api/courses.controller");

const router = express.Router()

router
  .route("/login")
  .post(CoursesCtrl.apiLogin)

router
  .route("/register")
  .post(CoursesCtrl.apiSignUp);

  router
  .route("/add")
  .post(CoursesCtrl.apiAdd);

module.exports = router;