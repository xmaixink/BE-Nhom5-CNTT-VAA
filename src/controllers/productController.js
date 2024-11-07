import productService from "../services/productService";

let createNewProduct = async (req, res) => {
      let message = await productService.createNewProductService(req.body);

      return res.status(200).json(message)
}
let getAllProduct = async (req, res) => {
      let id = req.query.id

      if (!id) {
            return res.status(200).json({
                  errCode: 1,
                  errMessage: "Missing required parameters product",
                  products: []
            })
      }

      let products = await productService.getAllProductService(id)

      return res.status(200).json({
            errCode: 0,
            errMessage: "You got products successfully",
            products
      })
}
let deleteProduct = async (req, res) => {
      let data = req.body.id
      let message = await productService.deleteProductService(data)

      return res.status(200).json(message)
}
let updateProduct = async (req, res) => {
      let data = req.body

      let message = await productService.updateProductService(data)

      return res.status(200).json(message)
}
module.exports = {
      createNewProduct, getAllProduct, deleteProduct, updateProduct
};
