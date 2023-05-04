const express = require('express');
const router = express.Router();
const User = require('./database/models/user.js');
const app = express();
// Update user profile
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password, profilePicture, userType, height, gender, weight, goal, preference } = req.body;

  try {
    const userData = {
      user_name: username,
      user_email: email,
      user_password: password,
      user_img: profilePicture,
      user_type: userType,
      user_heigth: height,
      user_gender: gender,
      user_weight: weight,
      user_goal: goal,
      user_preference: preference
    };
    await User.update(id, userData);
    const updatedUser = await User.findById(id);
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user' });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
module.exports = router;