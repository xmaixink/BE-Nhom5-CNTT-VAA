const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
      {
            idUser: {
                  type: String,
                  required: true,
            },
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
            },
            number: {
                  type: Number,
                  default: 1,
            },
            quality: {
                  type: String,
                  required: false,
            },
      },
      {
            timestamps: true,
      }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;