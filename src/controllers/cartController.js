import cartService from "../services/cartService";

let createNewCart = async (req, res) => {
      let message = await cartService.createNewCartService(req.body);

      return res.status(200).json(message)
}
let getAllCart = async (req, res) => {

      let carts = await cartService.getAllCartService()

      return res.status(200).json({
            errCode: 0,
            errMessage: "You got cart successfully",
            carts
      })
}
let deleteCart = async (req, res) => {
      let data = req.body.id
      let message = await cartService.deleteCartService(data)
      return res.status(200).json(message)
}

let updateCart = async (req, res) => {
      let data = req.body

      let message = await cartService.updateCartService(data)

      return res.status(200).json(message)
}
module.exports = {
      createNewCart, getAllCart, deleteCart, updateCart
};
