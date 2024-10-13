import Vendor from "../models/vendor"
import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let hashPassword = await bcrypt.hashSync(password, salt);
                  resolve(hashPassword);
            } catch (e) {
                  reject(e);
            }
      })
}

let createNewVendorService = (data) => {
      return new Promise(async (resolve, reject) => {

            try {
                  let hashPasswordFromBcrypt = await hashPassword(data.password);

                  await Vendor.create({
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                        password: hashPasswordFromBcrypt,
                        totalRestaurants: data.totalRestaurants
                  });

                  resolve({
                        errCode: 0,
                        message: "Added vendor succeed",
                  });
            } catch (e) {
                  reject(e)
            }
      })
}

let getAllVendorsService = (vendorId) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let users = "";

                  if (vendorId === "ALL") {
                        users = await Vendor.find().select('-password');
                  }
                  if (vendorId && vendorId != 'ALL') {
                        users = await Vendor.findOne({ _id: vendorId }).select('-password');
                  }

                  resolve(users);

            } catch (e) {
                  reject(e)
            }
      })
}

module.exports = {
      createNewVendorService, getAllVendorsService
};