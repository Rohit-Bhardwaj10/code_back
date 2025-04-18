const asynchandler = (func) => (req, res, next) => {
  try {
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export { asynchandler };
