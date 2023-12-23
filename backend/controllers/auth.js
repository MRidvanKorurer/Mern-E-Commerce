const User = require("../models/user.js");
const bcrypt = require("bcrypt");

const genereteRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 71);
  return `https://i.pravatar.cc/300?img=${randomAvatar}`;
};

module.exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const defaultAvatar = genereteRandomAvatar();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email adress is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar: defaultAvatar,
    });

    res.status(201).json({
      status: "OK",
      newUser,
      avatar: defaultAvatar,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "İnvalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "İnvalid password" });
    }

    res.status(200).json({
      status: "OK",
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
