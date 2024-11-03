import Restaurant from "../models/restaurant"
import Vendor from "../models/vendor"

let createNewRestaurantService = (data) => {
      return new Promise(async (resolve, reject) => {

            try {
                  let checkEmailVendor = await Vendor.findOne({
                        email: data.emailVendor,
                  })

                  console.log('checkEmailVendor ', checkEmailVendor)

                  if (checkEmailVendor) {
                        let newRestaurant = await Restaurant.create({
                              emailVendor: data.emailVendor,
                              nameRestaurant: data.nameRestaurant,
                              address: data.address,
                              action: data.action
                        });
                        if (newRestaurant) {
                              await Vendor.updateOne(
                                    { email: data.emailVendor },
                                    { $inc: { totalRestaurants: 1 } }
                              );
                        }
                  }

                  resolve({
                        errCode: 0,
                        message: "Added Restaurant succeed",
                  });
            } catch (e) {
                  reject(e)
            }
      })
}

let getAllRestaurantService = (emailVendor) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let users = "";

                  if (emailVendor === "ALL") {
                        users = await Restaurant.find()
                  }
                  if (emailVendor && emailVendor != 'ALL') {
                        users = await User.findOne({ emailVendor: emailVendor })
                  }

                  resolve(users);

            } catch (e) {
                  reject(e)
            }
      })
}

module.exports = {
      createNewRestaurantService, getAllRestaurantService
};