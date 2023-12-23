const User = require("../models/user");

module.exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json({
      status: "OK",
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports.deletelUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOneAndDelete({ email });

    res.status(200).json({
      status: "OK",
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
