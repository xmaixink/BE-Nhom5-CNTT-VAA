import db from '../../config'

let userDB = db.collection('users')

let createNewUserService = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  await userDB.doc().set({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                  })

                  resolve({
                        errCode: 0,
                        message: "Added user succeed",
                  });
            } catch (e) {
                  reject(e)
            }
      })
}

let getAllUserService = () => {
      return new Promise(async (resolve, reject) => {
            try {
                  let data = await userDB.get()
                  let allUser = data.docs.map((doc) => doc.data())
                  let idUser = data.docs.map((doc) => doc.id)

                  console.log(idUser.length)
                  resolve({
                        errCode: 0,
                        message: "Get All users",
                        allUser
                  });

            } catch (e) {
                  reject(e)
            }
      })
}

let deleteUserService = (userId) => {
      return new Promise(async (resolve, reject) => {
            try {

                  await userDB.doc(userId).delete();

                  resolve({
                        errCode: 0,
                        message: "Delete User Ok",
                  });
            } catch (e) {
                  reject(e)
            }
      })
}

let updateUserService = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  await userDB.doc(data.id).update({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                  });

                  resolve({
                        errCode: 0,
                        message: "Update User Ok",
                  });
            } catch (e) {
                  reject(e)
            }
      })
}

module.exports = {
      createNewUserService, getAllUserService, deleteUserService, updateUserService
};