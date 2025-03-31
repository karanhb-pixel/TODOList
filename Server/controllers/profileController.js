const getProfile = async (req, res) => {
  try {
    // Get user from database using ID from JWT
    const user = await User.findByPk(req.user.user_id);

    // Return user data as JSON
    res.json(user);
  } catch (error) {
    // Handle errors
    res.status(500).send("Server error");
  }
};

export default getProfile;
