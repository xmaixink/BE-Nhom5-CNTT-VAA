import Vendor from "../models/vendor"
import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);
import emailService from './emailService'
import { v4 as uuidv4 } from "uuid"

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

let buildEmailToken = (token) => {
      let result = ''
      result = `${process.env.URL_REACT}/verify-email/token=${token}`
      return result
}

let resgisterNewVendorService = (data) => {
      return new Promise(async (resolve, reject) => {

            try {
                  let hashPasswordFromBcrypt = await hashPassword(data.password);

                  let token = uuidv4()

                  await emailService.sendSimpleEmail({
                        reciverEmail: data.email,
                        nameVendor: data.nameVendor,
                        phoneNumber: data.phoneNumber,
                        redirectLink: buildEmailToken(token)
                  })

                  await Vendor.create({
                        email: data.email,
                        nameVendor: data.nameVendor,
                        phoneNumber: data.phoneNumber,
                        password: hashPasswordFromBcrypt,
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
let verifyRegisterVendorService = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!data.token) {
                        resolve({
                              errCode: 1,
                              errMessage: "Missing parameters verify"
                        })
                  } else {
                        let verify = await Vendor.findOne({
                              where
                        })
                  }
            } catch (e) {
                  reject(e)
            }
      })
}

let vendorLoginService = (emailInput, passwordInput, phoneNumberInput) => {
      return new Promise(async (resolve, reject) => {

            try {
                  let vendorData = {}

                  let vendor = await Vendor.findOne({
                        email: emailInput,
                        phoneNumber: phoneNumberInput
                  });

                  console.log('check vendor', vendor)

                  if (vendor) {
                        let check = await bcrypt.compareSync(passwordInput, vendor.password);

                        if (check) {
                              vendorData.errCode = 0;
                              vendorData.errMessage = "Okie nhe";
                              vendorData.vendor = vendor;
                        } else {
                              vendorData.errCode = 3;
                              vendorData.errMessage = "Wrong password login";
                        }
                  } else {
                        //return error
                        vendorData.errCode = 1;
                        vendorData.errMessage = `Your email or your password isn't exist in your system. Plz try other email`;
                  }

                  resolve(vendorData);
            } catch (e) {
                  reject(e)
            }
      })
}


module.exports = {
      resgisterNewVendorService, getAllVendorsService,
      verifyRegisterVendorService, vendorLoginService
};