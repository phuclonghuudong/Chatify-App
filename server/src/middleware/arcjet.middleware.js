import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../lib/arcjet.js";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          message: "Đã vượt quá giới hạn tốc độ. Vui lòng thử lại sau.",
        });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Quyền truy cập bị từ chối." });
      } else {
        return res.status(403).json({
          message: "Quyền truy cập bị từ chối bởi chính sách bảo mật.",
        });
      }
    }

    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Phát hiện bot giả mạo",
        message: "Phát hiện hoạt động bot độc hại. Quyền truy cập bị từ chối.",
      });
    }

    next();
  } catch (error) {
    console.log("Arcjet Error:", error);
    next();
  }
};
