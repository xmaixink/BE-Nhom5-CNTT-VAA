const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
      {
            image: {
<<<<<<< HEAD
                type: String,
                required: true,
=======
                  type: String,
                  required: true,
>>>>>>> 60a8c63 (get all delete update)
            },
            name: {
                  type: String,
                  required: true,
            },
            description: {
<<<<<<< HEAD
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
=======
                  type: String,
                  required: true,
            },

            ingredients: {
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
>>>>>>> 60a8c63 (get all delete update)
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;