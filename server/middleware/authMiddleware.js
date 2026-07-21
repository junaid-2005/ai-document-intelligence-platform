const supabase = require("../config/supabase");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Middleware:", error);

    return res.status(401).json({
      success: false,
      message: "Unauthorized.",
    });
  }
};

module.exports = authMiddleware;