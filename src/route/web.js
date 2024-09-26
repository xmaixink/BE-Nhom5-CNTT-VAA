import express from "express";
import userController from "../controllers/userController.js";

let router = express.Router();

let initWebRoutes = (app) => {

	router.get("/api/get-all-users", userController.getAllUser)
	router.post("/api/create-new-user", userController.createNewUser)
	router.delete("/api/delete-user", userController.deleteUser)
	router.put("/api/update-user", userController.updateUser)

	return app.use("/", router);

}

module.exports = initWebRoutes;

