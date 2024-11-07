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

module.exports = {
      createNewCart, getAllCart
};
