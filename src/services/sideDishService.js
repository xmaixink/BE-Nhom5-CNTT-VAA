import SideDish from "../models/SideDish"; // Đảm bảo import model SideDish
const mongoose = require('mongoose');  // Đảm bảo mongoose được import đúng

let createNewSideDishService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra nếu thiếu tên hoặc giá
      if (!data.name || !data.price) {
        reject({
          errCode: 1,
          errMessage: "Missing required fields: name and price are required."
        });
      }

      const newSideDish = new SideDish({
        name: data.name,
        price: data.price,
        image: data.image,
        description: data.description,
        category: data.category,
        availability: data.availability,
      });

      await newSideDish.save(); // Lưu vào MongoDB

      resolve({
        errCode: 0,
        message: "Side dish created successfully",
      });
    } catch (error) {
      console.error("Error creating side dish:", error);
      reject({
        errCode: 1,
        message: "Error creating side dish",
        error: error.message,
      });
    }
  });
};


let getAllSideDishService = (id = "ALL") => {  // Default là "ALL"
  return new Promise(async (resolve, reject) => {
    try {
      let sideDishes;

      if (id === "ALL") {
        sideDishes = await SideDish.find();  // Lấy tất cả món ăn kèm
      } else {
        // Kiểm tra xem ID có hợp lệ không trước khi tìm
        if (!mongoose.Types.ObjectId.isValid(id)) {
          reject(new Error("Invalid ID format"));
          return;
        }
        sideDishes = await SideDish.findOne({ _id: id });  // Lấy món ăn kèm theo ID
      }

      if (!sideDishes || (Array.isArray(sideDishes) && sideDishes.length === 0)) {
        resolve([]);  // Nếu không có món ăn kèm, trả về mảng rỗng
      } else {
        resolve(sideDishes);  // Trả về dữ liệu món ăn kèm
      }

    } catch (e) {
      console.error("Error in getAllSideDishService:", e);
      reject(e); // Log lỗi nếu có
    }
  });
};



let deleteSideDishService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra xem món ăn có tồn tại trong cơ sở dữ liệu không
      const sideDish = await SideDish.findById(id);
      if (!sideDish) {
        reject({
          errCode: 1,
          errMessage: "Side dish not found.",
        });
        return;
      }

      // Tiến hành xóa nếu có
      await SideDish.findByIdAndDelete(id);
      resolve({
        errCode: 0,
        message: "Side dish deleted successfully.",
      });
    } catch (error) {
      reject({
        errCode: 2,
        errMessage: "Error deleting side dish",
        error: error.message,
      });
    }
  });
};

let updateSideDishService = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra xem id có hợp lệ hay không
      if (!mongoose.Types.ObjectId.isValid(id)) {
        reject({
          errCode: 1,
          errMessage: "Invalid ObjectId format.",
        });
        return;
      }

      // Kiểm tra xem món ăn có tồn tại trong cơ sở dữ liệu không
      const sideDish = await SideDish.findById(id);
      if (!sideDish) {
        reject({
          errCode: 1,
          errMessage: "Side dish not found.",
        });
        return;
      }

      // Cập nhật thông tin món ăn phụ
      sideDish.name = data.name || sideDish.name;
      sideDish.price = data.price || sideDish.price;
      sideDish.image = data.image || sideDish.image;
      sideDish.description = data.description || sideDish.description;
      sideDish.category = data.category || sideDish.category;
      sideDish.availability = data.availability !== undefined ? data.availability : sideDish.availability;

      // Lưu thông tin cập nhật vào cơ sở dữ liệu
      await sideDish.save();

      resolve({
        errCode: 0,
        message: "Side dish updated successfully.",
      });
    } catch (error) {
      reject({
        errCode: 2,
        errMessage: "Error updating side dish",
        error: error.message,
      });
    }
  });
};

module.exports = {
  createNewSideDishService,
  getAllSideDishService,
  deleteSideDishService,
  updateSideDishService,
};
