const express = require("express");
const {
  registerUser,
  authUser,
  getUserProfile,
} = require("../controllers/UserControllers.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();
router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile);
module.exports = router;
