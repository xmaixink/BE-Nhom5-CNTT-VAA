const mongoose = require("mongoose");

const OrderHistorySchema = mongoose.Schema(
      {
            products: [
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
                        },
                        number: {
                              type: Number,
                              default: 1,
                        },
                  },
            ],
            status: {
                  type: String,
                  required: true,
                  enum: ["Chưa thanh toán", "Đã thanh toán"],
                  default: "Chưa thanh toán",
            },
            userId: {
                  type: String,
                  required: true,
            },
            method: {
                  type: String,
                  required: true,
            },
            side_dishes: [
                  {
                        name: {
                              type: String,
                              required: false,
                        },
                        price: {
                              type: Number,
                              required: false,
                        },
                        image: {
                              type: String,
                              required: false,
                        },
                        description: {
                              type: String,
                              required: false,
                        },
                        category: {
                              type: String,
                              required: false,
                        },
                        availability: {
                              type: Boolean,
                              default: false,
                        },
                        number: {
                              type: Number,
                              default: 1,
                              required: true,
                        },
                  },
            ]
      },
      {
            timestamps: true,
      }
);

const OrderHistory = mongoose.model("OrderHistory", OrderHistorySchema);

module.exports = OrderHistory;