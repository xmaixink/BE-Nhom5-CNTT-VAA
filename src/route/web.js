import express from "express";
import cartController from "../controllers/cartController";
import productController from "../controllers/productController.js";
import restaurantController from "../controllers/restaurantController.js";
import userController from "../controllers/userController.js";
import vendorController from "../controllers/vendorController.js";
import orderController from "../controllers/OrderController.js";
import sideDishController from "../controllers/sideDishController.js";

const vnpay = require("./vnpay.js");

let router = express.Router();

let initWebRoutes = (app) => {
	router.post("/api/login", userController.loginUser);
	router.post("/api/register", userController.RegisterUser);

	router.get("/api/get-all-users", userController.getAllUser);
	router.post("/api/create-new-user", userController.createNewUser);
	router.delete("/api/delete-user", userController.deleteUser);
	router.put("/api/update-user", userController.updateUser);

	router.get("/api/get-all-vendors", vendorController.getAllVendors);
	router.post("/api/create-new-vendor", vendorController.resgisterNewVendor);

	router.post("/api/create-new-restaurant", restaurantController.createNewRestaurant);
	router.post("/api/create-new-product", productController.createNewProduct);
	router.get("/api/get-all-product", productController.getAllProduct);
	router.delete("/api/delete-product", productController.deleteProduct);
	router.put("/api/update-product", productController.updateProduct);
	router.get("/api/get-all-restaurant", restaurantController.getAllRestaurants);

	router.post("/api/create-new-cart", cartController.createNewCart);
	router.get("/api/get-all-cart", cartController.getAllCart);
	router.delete("/api/delete-cart", cartController.deleteCart);
	router.put("/api/update-cart", cartController.updateCart);

	router.post("/api/create-new-order", orderController.createNewOrder);
	router.post("/api/update-status-order/:orderId", orderController.updateStatusOrder);
	router.get("/api/get-all-order", orderController.getAllOrder);

	router.post("/api/create-side-dish", sideDishController.createNewSideDish);
	router.delete("/api/delete-side-dish/:id", sideDishController.deleteSideDish);
	router.get("/api/get-all-side-dishes", sideDishController.getAllSideDish);
	router.put("/api/update-side-dish/:id", sideDishController.updateSideDish);
	app.use("/api/v1/vnpay", vnpay);

	return app.use("/", router);
};

module.exports = initWebRoutes;