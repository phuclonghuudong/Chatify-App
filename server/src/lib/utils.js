import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const { JWT_SECRET, NODE_ENV } = process.env;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET Không được định nghĩa trong biến môi trường.");
  }

  const token = jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "Strict",
    secure: NODE_ENV === "production",
    httpOnly: true,
  });

  return token;
};
