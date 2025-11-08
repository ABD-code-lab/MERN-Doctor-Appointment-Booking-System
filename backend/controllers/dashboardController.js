// Sample dashboard controller
exports.getDashboard = (req, res) => {
  const { role, name } = req.user;

  switch (role) {
    case "admin":
      return res.json({
        message: `Welcome Admin ${name}`,
        data: { totalUsers: 100, totalDoctors: 20, totalPatients: 80 }
      });
    case "doctor":
      return res.json({
        message: `Welcome Doctor ${name}`,
        data: { appointmentsToday: 5, patientsToday: 5 }
      });
    case "patient":
      return res.json({
        message: `Welcome ${name}`,
        data: { upcomingAppointments: 2, doctorAssigned: "Dr. Smith" }
      });
    default:
      return res.status(400).json({ message: "Invalid role" });
  }
};

// Get logged-in user info for dashboard
exports.getMe = (req, res) => {
  try {
    const { name, role } = req.user;
    return res.json({ name, role });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
