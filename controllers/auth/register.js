const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models/userSchema");

const { HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password, city, phone } = req.body;
  const isUser = await User.findOne({ email });
  if (isUser) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    city,
    phone,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      name: newUser.name,
      city: newUser.city,
      phone: newUser.phone,
    },
  });
};

module.exports = register;
