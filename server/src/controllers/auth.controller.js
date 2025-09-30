import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { fullName, password, email } = req.body ?? {};

  try {
    if (!fullName || !password || !email) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Mật khẩu ít nhất 6 chữ số." });
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email không đúng định dạng." });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const payload = { fullName, email, password: hashedPassword };
    const newUser = new User(payload);

    if (newUser) {
      const saveUser = await newUser.save();
      generateToken(saveUser._id, res);

      res.status(201).json({
        message: "Đăng ký thành công.",
        data: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePicture: newUser.profilePicture,
        },
      });

      try {
        await sendWelcomeEmail(
          saveUser.email,
          saveUser.fullName,
          ENV.CLIENT_URL
        );
      } catch (error) {
        console.log("Lỗi gửi email:", error);
      }
    } else {
      return res.status(500).json({ message: "Đăng ký không thành công" });
    }
  } catch (error) {
    console.log("ERROR CONTROLLER SIGNUP:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body ?? {};
  try {
    if (!password || !email) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Tài khoản không tồn tại." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Tài khoản hoặc mật khẩu không đúng." });
    }

    generateToken(user._id, res);

    res.status(201).json({
      message: "Đăng nhập thành công.",
      data: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.log("ERROR CONTROLLER LOGIN:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Đăng xuất thành công" });
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body ?? {};
    if (!profilePicture) {
      return res.status(400).json({ message: "Vui lòng cung cấp hình ảnh." });
    }

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePicture);

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePicture: uploadResponse.secure_url,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Cập nhật hình đại diện thành công.",
      data: updateUser,
    });
  } catch (error) {
    console.log("ERROR CONTROLLER UPDATE PROFILE:", error);
    res.status(500).json({ message: "Server error" });
  }
};
