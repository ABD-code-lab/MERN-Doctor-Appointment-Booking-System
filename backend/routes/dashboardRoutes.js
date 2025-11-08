const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getDashboard, getMe } = require("../controllers/dashboardController");

// Role-based dashboard
router.get("/", protect(), getDashboard);

// Get current logged-in user info
router.get("/me", protect(), getMe);  // ✅ This is required for frontend dashboards

module.exports = router;
