const getChatHistory =
  require("../utils/getChatHistory");

const getAllDocuments = async (
  req,
  res
) => {
  try {
    const history =
      await getChatHistory(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllDocuments,
};