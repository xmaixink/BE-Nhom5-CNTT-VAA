const OrderHistory = require("../models/order-history");

let createNewOrderService = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  await OrderHistory.create({
                        products: data.products,
                        userId: data.userId,
                        side_dishes: data.side_dishes,
                        method: data.method
                  });

                  resolve({
                        errCode: 0,
                        message: "Added cart succeed",
                  });
            } catch (e) {
                  reject(e);
            }
      });
};

let getAllOrderService = () => {
      return new Promise(async (resolve, reject) => {
            try {
                  let OrderHistorys = await OrderHistory.find();
                  resolve(OrderHistorys);
            } catch (e) {
                  reject(e);
            }
      });
};
const updateStatusService = async (orderId) => {
      try {
            const result = await OrderHistory.updateOne(
                  { _id: orderId },
                  { status: "Đã thanh toán" }
            );

            if (result.modifiedCount > 0) {
                  return { message: "Order updated successfully" };
            } else {
                  return { message: "No order was updated" };
            }
      } catch (error) {
            throw new Error("Error updating order: " + error.message);
      }
};

module.exports = {
      createNewOrderService,
      getAllOrderService,
      updateStatusService,
};