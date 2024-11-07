import User from "../models/user"

import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
	return new Promise(async (resolve, reject) => {
		try {
			let hashPassword = await bcrypt.hashSync(password, salt);
			resolve(hashPassword);
		} catch (e) {
			reject(e);
		}
	})
}

let createNewUserService = (data) => {
	return new Promise(async (resolve, reject) => {

		try {
			let hashPasswordFromBcrypt = await hashUserPassword(data.password);

			await User.create({
				email: data.email,
				name: data.name,
				password: hashPasswordFromBcrypt,
				address: data.address
			});

			resolve({
				errCode: 0,
				message: "Added user succeed",
			});
		} catch (e) {
			reject(e)
		}
	})
}

let getAllUserService = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let users = "";

			if (userId === "ALL") {
				users = await User.find().select('-password');
			}
			if (userId && userId != 'ALL') {
				users = await User.findOne({ _id: userId }).select('-password');
			}

			resolve(users);

		} catch (e) {
			reject(e)
		}
	})
}

let deleteUserService = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let foundUser = await User.findOne(
				{ _id: userId }
			)
			if (!foundUser) {
				resolve({
					errCode: 2,
					errMessage: `The user isn't exist`
				})
			}
			await User.findByIdAndDelete(userId);

			resolve({
				errCode: 0,
				message: "Delete User Ok",
			});
		} catch (e) {
			reject(e)
		}
	})
}

let updateUserService = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data.id) {
				resolve({
					errCode: 2,
					errMessage: "Missing required parameters updateUserService"
				})
			}

			const user = await User.findOne({
				_id: data.id,
			})

			if (user) {
				user.email = data.email;
				user.name = data.name;
				user.address = data.address

				await user.save();

				resolve({
					errCode: 0,
					message: "Update the user succeeds!"
				})
			} else {
				resolve({
					errCode: 1,
					errMessage: "User not found"
				});
			}

			resolve({
				errCode: 0,
				message: "Update User Ok",
			});
		} catch (e) {
			reject(e)
		}
	})
}

module.exports = {
	createNewUserService, getAllUserService, deleteUserService, updateUserService,
};