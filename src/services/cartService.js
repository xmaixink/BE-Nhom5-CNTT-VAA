import Cart from "../models/cart"

let createNewCartService = (data) => {
      return new Promise(async (resolve, reject) => {

            try {
                  await Cart.create({
                        imageProduct: data.imageProduct,
                        nameProduct: data.nameProduct,
                        priceProduct: data.priceProduct
                  });

                  resolve({
                        errCode: 0,
                        message: "Added cart succeed",
                  });
            } catch (e) {
                  reject(e)
            }
      })
}

let getAllCartService = () => {
      return new Promise(async (resolve, reject) => {
            try {
                  let carts = await Cart.find();

                  resolve(carts);

            } catch (e) {
                  reject(e)
            }
      })
}


module.exports = {
      createNewCartService, getAllCartService
};