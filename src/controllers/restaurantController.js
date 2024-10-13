import restaurantService from "../services/RestaurantService"

let createNewRestaurant = async (req, res) => {
      let message = await restaurantService.createNewRestaurantService(req.body);

      return res.status(200).json(message)
}

let getAllRestaurants = async (req, res) => {
      let emailVendor = req.query.emailVendor //ALL, emailVendor

      if (!emailVendor) {
            return res.status(200).json({
                  errCode: 1,
                  errMessage: "Missing required parameters user",
                  users: []
            })
      }

      let restaurants = await restaurantService.getAllRestaurantService(emailVendor)

      return res.status(200).json({
            errCode: 0,
            errMessage: "You get user succeed",
            restaurants
      })
}


module.exports = {
      createNewRestaurant, getAllRestaurants
};