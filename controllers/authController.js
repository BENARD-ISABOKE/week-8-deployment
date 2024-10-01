const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Registration function
exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({ username, password: hashedPassword });
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send(error);
  }
};

// Login function
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).send('Logged in successfully');
    } else {
      res.status(400).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};
