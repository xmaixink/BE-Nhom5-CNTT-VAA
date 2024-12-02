const sideDishService = require("../services/sideDishService");

let createNewSideDish = async (req, res) => {
  try {
    let message = await sideDishService.createNewSideDishService(req.body);
    return res.status(200).json(message);
  } catch (error) {
    console.error(error); // Kiểm tra lỗi
    return res.status(500).json({
      message: "Error creating side dish",
      error: error.message,
    });
  }
};


let getAllSideDish = async (req, res) => {
  try {
    let id = req.query.id;

    let sideDishes = await sideDishService.getAllSideDishService(id);

    return res.status(200).json({
      errCode: 0,
      errMessage: "You got side dishes successfully",
      sideDishes,
    });
  } catch (error) {
    console.error("Error fetching side dishes:", error);  // Log lỗi nếu có
    return res.status(500).json({
      message: "Error fetching side dishes",
      error,
    });
  }
};

let deleteSideDish = async (req, res) => {
  try {
    const sideDishId = req.params.id; // Lấy ID từ tham số URL
    let message = await sideDishService.deleteSideDishService(sideDishId); // Gọi service xóa món ăn
    return res.status(200).json(message);
  } catch (error) {
    console.log("Error deleting side dish:", error); // In lỗi ra console nếu có
    return res.status(500).json({
      message: "Error deleting side dish",
      error: error.message,
    });
  }
};

let updateSideDish = async (req, res) => {
  try {
    let message = await sideDishService.updateSideDishService(req.params.id, req.body);
    return res.status(200).json(message);
  } catch (error) {
    console.error("Error updating side dish:", error); // In lỗi ra console để biết chi tiết
    return res.status(500).json({
      message: "Error updating side dish",
      error: error.message,
    });
  }
};

module.exports = {
  createNewSideDish,
  deleteSideDish,
  getAllSideDish,
  updateSideDish
};
