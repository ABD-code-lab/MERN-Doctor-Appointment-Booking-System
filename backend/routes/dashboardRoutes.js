const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getDashboard, getMe } = require("../controllers/dashboardController");

// Role-based dashboard
router.get("/", protect(), getDashboard);

router.get("/me", protect(), getMe);  

module.exports = router;
