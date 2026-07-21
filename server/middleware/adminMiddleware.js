const supabase =
  require("../config/supabase");

const adminMiddleware =
  async (req, res, next) => {
    try {
      const { data, error } =
        await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", req.user.id)
          .single();

      if (
        error ||
        !data ||
        !data.is_admin
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Admin access required",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Admin verification failed",
      });
    }
  };

module.exports =
  adminMiddleware;