const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
      {
            imageProduct: {
                  type: String,
                  required: true,
            },
            nameProduct: {
                  type: String,
                  required: true,
            },
            priceProduct: {
                  type: Number,
                  required: true,
            }
      },
      {
            timestamps: true,
      }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;