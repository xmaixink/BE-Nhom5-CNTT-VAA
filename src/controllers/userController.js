import userService from "../services/userService";

let createNewUser = async (req, res) => {

      console.log('check user', req.body)

      let message = await userService.createNewUserService(req.body);

      return res.status(200).json(message)
}

let getAllUser = async (req, res) => {
      let message = await userService.getAllUserService()

      return res.status(200).json(message)
}

let deleteUser = async (req, res) => {
      let data = req.body.id
      let message = await userService.deleteUserService(data)

      return res.status(200).json(message)
}

let updateUser = async (req, res) => {
      let data = req.body

      let message = await userService.updateUserService(data)

      return res.status(200).json(message)
}

module.exports = {
      createNewUser, getAllUser, deleteUser, updateUser
};
