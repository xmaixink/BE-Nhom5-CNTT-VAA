import verndorService from "../services/vendorService"

let createNewVendor = async (req, res) => {
      let message = await verndorService.createNewVendorService(req.body);

      return res.status(200).json(message)
}

let getAllVendors = async (req, res) => {
      let id = req.query.id

      if (!id) {
            return res.status(200).json({
                  errCode: 1,
                  errMessage: "Missing required parameters user",
                  vendors: []
            })
      }
      let vendors = await verndorService.getAllVendorsService(id)
      return res.status(200).json({
            errCode: 0,
            errMessage: "You get user succeed",
            vendors
      })
}


module.exports = {
      createNewVendor, getAllVendors
};