import express from "express";
import userController from "../controllers/userController.js";
import vendorController from "../controllers/vendorController.js"
import restaurantController from "../controllers/restaurantController.js"

let router = express.Router();

let initWebRoutes = (app) => {

	router.get("/api/get-all-users", userController.getAllUser)
	router.post("/api/create-new-user", userController.createNewUser)
	router.delete("/api/delete-user", userController.deleteUser)
	router.put("/api/update-user", userController.updateUser)

	router.get("/api/get-all-vendors", vendorController.getAllVendors)
	router.post("/api/create-new-vendor", vendorController.createNewVendor)

	router.post("/api/create-new-restaurant", restaurantController.createNewRestaurant)
	router.get("/api/get-all-restaurant", restaurantController.getAllRestaurants)
	return app.use("/", router);

}

module.exports = initWebRoutes;

