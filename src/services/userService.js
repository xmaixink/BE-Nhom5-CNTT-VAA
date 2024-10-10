import db from '../../config'

let userDB = db.collection('users')

let createNewUserService = (data) => {
      return new Promise(async (resolve, reject) => {

            try {
                  await userDB.doc().set({
                        email: data.email,
                        name: data.name,
                        password: data.password,
                        address: data.address,
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

let getAllUserService = (userId) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let user = ''
                  // let idUser = data.docs.map((doc) => doc.snapshot)
                  if (userId === 'ALL') {
                        let dataALL = await userDB.get()

                        user = dataALL.docs.map((doc) => ({
                              id: doc.id, // Lấy ID của tài liệu
                              ...doc.data() // Lấy dữ liệu của tài liệu
                        }))

                  }
                  if (userId && userId !== 'ALL') {
                        let dataId = await userDB.doc(userId)
                        let userData = await dataId.get()
                        user = {
                              id: userData.id, // Lấy ID của tài liệu
                              ...userData.data() // Lấy dữ liệu của tài liệu
                        };
                  }
                  resolve(user);

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
                  await userDB.doc(data.idEditUser).update({
                        name: data.name,
                        address: data.address,
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