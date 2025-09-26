import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { fullname, password, email } = req.body;

  try {
    if (!fullname || !password || !email) {
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

    const payload = { fullname, email, password: hashedPassword };
    const newUser = new User(payload);

    if (newUser) {
      const saveUser = await newUser.save();
      generateToken(saveUser._id, res);

      res.status(201).json({
        message: "Đăng ký thành công.",
        data: {
          _id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
          profilePic: newUser.profilePic,
        },
      });

      try {
        await sendWelcomeEmail(
          saveUser.email,
          saveUser.fullname,
          process.env.CLIENT_URL
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
