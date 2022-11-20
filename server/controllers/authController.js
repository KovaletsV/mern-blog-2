import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const register = async (req, res) => {
    try {
        const { username, email, password, avatarUrl } = req.body;

        const isUsed = await User.findOne({ username });

        if (isUsed) {
            return res.json({ message: "User already exist" });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: passwordHash,
            avatarUrl
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, "nosecret", {
            expiresIn: "30d"
        });

        res.json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "bad register" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User govnyk not found"
            });
        }

        const isValidPass = await bcrypt.compare(password, user.password);

        if (!isValidPass) {
            return res.status(400).json({
                message: "wrong login or password"
            });
        }

        const token = jwt.sign({ id: user._id }, "nosecret", {
            expiresIn: "30d"
        });

        res.json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Bad log"
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Bad user search"
        });
    }
};
