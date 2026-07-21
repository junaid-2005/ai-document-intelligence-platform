const deleteDocument =
  require("../utils/deleteDocument");

const removeDocument = async (
  req,
  res
) => {
  try {
    const { documentId } =
      req.params;

    await deleteDocument(
      documentId,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Document deleted successfully",
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  removeDocument,
};