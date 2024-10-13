const mongoose = require("mongoose");

const VendorSchema = mongoose.Schema(
      {
            email: {
                  type: String,
                  unique: true,
                  required: true,
            },
            password: {
                  type: String,
                  required: true,
            },
            phoneNumber: {
                  type: String,
                  required: true,
            },
            totalRestaurants: {
                  type: Number,
                  required: true,
            }
      },
      {
            timestamps: true,
      }
);

const Vendor = mongoose.model("Vendor", VendorSchema);

module.exports = Vendor;