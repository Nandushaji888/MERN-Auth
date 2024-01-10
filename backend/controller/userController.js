import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userController = {
  register: async (req, res) => {
    //register user
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      res.json({ exist: true });
      return;
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    //create new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
      image: "image-1700198432230852.jpg",
    });

    try {
      await user.save();
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      console.log(token);
      res.json({ user, token });
    } catch (err) {
      console.log("hfdjksfdjk");
      res.status(500).send(err);
    }
  },
  login: async (req, res) => {
    //user login
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ failed: true });
    }else if(!user.isActive){
        return res.json({ failed1: true });

    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.json({ failed: true });

    try {
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.json({ user, token });
    } catch (err) {
      // res.status(500).send(err)
      res.json({ failed: true });
    }
  },
  updateUser: async (req, res) => {
    try {
      await User.updateOne(
        { email: req.body.email },
        { $set: { image: req.file.filename } },
        { upsert: true }
      );
      const user = await User.findOne({ email: req.body.email }).exec();
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.json({ user, token });
    } catch (err) {
      throw new Error(err);
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json({ users });
    } catch (err) {}
  },
  changeStatus: async (req, res) => {
    let state = true;
    if (req.body.status == "Active") state = false;

    try {
      await User.findOneAndUpdate({ _id: req.body.id }, { isActive: state });
      const users = await User.find();
      res.json({ users });
    } catch (err) {
        console.log(err.message);
    }
  },
  editUser: async (req, res) => {
    try {
      await User.findOneAndUpdate(
        { _id: req.body.id },
        { name: req.body.name, email: req.body.email }
      );
      const user = await User.findOne({ _id: req.body.id }).exec();
      console.log(req.body);
      console.log("user", user);
      res.json({ user });
    } catch (err) {}
  },
  deleteUser: async (req, res) => {
    console.log(req.body);
    try {
      await User.deleteOne({ _id: req.body.id });
      res.json("Item deleted");
    } catch (err) {}
  },
};
export { userController };
