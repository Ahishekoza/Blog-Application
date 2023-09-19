import userSchema from "../models/userSchema.js";
import jwtToken from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const jsonwebtoken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
  };
  const secret_key = process.env.SECRET_KEY;

  const options = { expiresIn: "1d" };

  const token = jwtToken.sign(payload, secret_key, options);

  return token;
};

export const register = async (req, res) => {
    // --Check wether the user is Present
  const existingUser = await userSchema.find({ email: req.body.email, username: req.body.username});
  console.log(existingUser);
  if (existingUser.length > 0) {
    return res.status(200).json({
      message: "User already registered",
    });
  } else {
    
    const user = new userSchema({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Hashing the password
    user.password = await bcrypt.hash(req.body.password, 10);

    user
      .save()
      .then((response) => {
        res.status(200).json({
          message: "User saved successfully",
          User: response,
        });
      })
      .catch((err) => {
        res.status(404).json({
          message: `Couldn't save user ${err.message}`,
        });
      });
  }
};
export const login = async (req, res) => {
  await userSchema
    .find({ email: req.body.email })
    .then((user) => {
      console.log(user);
      const match = bcrypt.compare(req.body.password, user[0].password);
      if (!match) {
        return res.status(404).json({
          message: "password mismatch",
        });
      }

      res.status(200).json({
        User: { ...user[0]._doc, token: jsonwebtoken(user[0]) },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Couldn't find user ${err.message}`,
      });
    });
};

export const updateUser = async (req, res) => {
  await userSchema
    .findById(req.params.id)
    .then(async (user) => {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      if (req.file.path) {
        user.profilePic = req.file.path;
      }

      user
        .save({ new: true })
        .then((updateUser) => {
          res.status(200).json({
            message: "User Updated Successfully",
            User: updateUser,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: `Error Updating User: ${err.message}`,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "User Not Found",
      });
    });
};

export const getUserById = async (req, res) => {
  await userSchema
    .findById(req.params.id)
    .then((user) => {
      res.status(200).json({
        User: user,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: `Couldn\'t find user ${err.message}`,
      });
    });
};

export const getAllUsers = async (req, res) => {
  await userSchema
    .find()
    .then((users) => {
      res.status(200).json({
        Users: users,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: `Couldn\'t fetch all the users ${err.message}`,
      });
    });
};
