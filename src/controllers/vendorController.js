import verndorService from "../services/vendorService"

let resgisterNewVendor = async (req, res) => {
      let message = await verndorService.resgisterNewVendorService(req.body);

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

let handleLVendorLogin = async (req, res) => {
      let email = req.body.email;
      let password = req.body.password;
      let phoneNumber = req.body.phoneNumber;

      if (!email || !password || !phoneNumber) {
            return res.status(500).json({
                  errCode: 1,
                  message: "Missing inputs parameters",
            });
      }

      let vendorData = await verndorService.vendorLoginService(email, password, phoneNumber);
      console.log('check controller userData', vendorData);
      // check mail exist
      // compare password
      // return userinfor
      // access token
      return res.status(200).json({
            errCode: vendorData.errCode,
            message: vendorData.errMessage,
            vendor: vendorData.vendor ? vendorData.vendor : {},
      });
};

let verifyRegisterVendor = async (req, res) => {
      let message = await verndorService.verifyRegisterVendorService(req.body);

      return res.status(200).json(message)
}


module.exports = {
      resgisterNewVendor, getAllVendors, verifyRegisterVendor, handleLVendorLogin
};