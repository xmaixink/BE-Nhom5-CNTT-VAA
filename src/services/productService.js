import Product from "../models/product";

let createNewProductService = (data) => {
      return new Promise(async (resolve, reject) => {
            try {

                  await Product.create({
                        image: data.image,
                        name: data.name,
                        description: data.description,
                        ingredients: data.ingredients,
                        price: data.price
                  });

                  resolve({
                        errCode: 0,
                        message: "Added Product succeed",
                  });
            } catch (e) {
                  reject(e)
            }
      })
}
let getAllProductService = (productId) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let products = "";

                  if (productId === "ALL") {
                        products = await Product.find();
                  }
                  if (productId && productId != 'ALL') {
                        products = await Product.findOne({ _id: productId });
                  }

                  resolve(products);

            } catch (e) {
                  reject(e);
            }
      });
};
let deleteProductService = (productId) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let foundProduct = await Product.findOne(
                        { _id: productId }
                  );
                  if (!foundProduct) {
                        resolve({
                              errCode: 2,
                              errMessage: `The product doesn't exist`
                        });
                  }
                  await Product.findByIdAndDelete(productId);

                  resolve({
                        errCode: 0,
                        message: "Delete Product rui ",
                  });
            } catch (e) {
                  reject(e);
            }
      });
};
let updateProductService = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!data.id) {
                        resolve({
                              errCode: 2,
                              errMessage: "Missing required parameters updateProductService"
                        });
                  }

                  const product = await Product.findOne({
                        _id: data.id,
                  });

                  if (product) {
                        product.name = data.name;
                        product.price = data.price;
                        product.description = data.description;

                        await product.save();

                        resolve({
                              errCode: 0,
                              message: "Update the product succeeds!"
                        });
                  } else {
                        resolve({
                              errCode: 1,
                              errMessage: "Product not found"
                        });
                  }

            } catch (e) {
                  reject(e);
            }
      });
};


module.exports = {
      createNewProductService, getAllProductService, deleteProductService, updateProductService
};