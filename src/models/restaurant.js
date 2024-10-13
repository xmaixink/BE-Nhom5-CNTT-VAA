const mongoose = require("mongoose");

const RestaurantSchema = mongoose.Schema(
      {
            emailVendor: {
                  type: String,
                  required: true,
            },
            nameRestaurant: {
                  type: String,
                  required: true,
            },
            address: {
                  type: String,
                  required: true,
            },
            image: {
                  type: String,
                  required: false,
            },
            action: {
                  type: Boolean,
                  required: true,
            }
      },
      {
            timestamps: true,
      }
);

const User = mongoose.model("Restaurant", RestaurantSchema);

module.exports = User;