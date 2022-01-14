const User = require("../models/User");

module.exports = async function isAdmin(req, res, next) {
  try {
    const admin = await User.findById(req.params.id);

    if (!admin || !admin.isAdmin) {
      return res
        .status(403)
        .json({ message: "You don't have permission to access !" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
