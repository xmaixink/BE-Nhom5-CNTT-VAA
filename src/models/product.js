const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
      {
            image: {
                type: String,
                required: true,
            },
            name: {
                  type: String,
                  required: true,
            },
            description: {
                type: String,
                required: true,
            },
            
            ingredients:{
                type: Array,
                required: true,
            },
            
            price: {
                type: Number,
                required: true,
            }
        },
        {
            timestamps: true,
        }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;