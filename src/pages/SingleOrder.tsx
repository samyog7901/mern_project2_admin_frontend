import  { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { handleOrderStatusById, fetchSingleOrderById, handlePaymentStatusById } from "../store/dataSlice";
import { OrderStatus, PaymentStatus, SingleOrderItem } from "../types/data";
import { socket } from "../App";


// define the shape of a single order item


const SingleOrder = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { singleOrder } = useAppSelector((state) => state.datas);
 //@ts-ignore
  const [orderStatus, setOrderStatus] = useState<OrderStatus | string>("");
  //@ts-ignore
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | string>("");

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleOrderById(id));
    }
  }, [id, dispatch]);

  const handleOrderStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as OrderStatus;
    setOrderStatus(status);

    const orderInfo = singleOrder[0];
    if (id && orderInfo) {
      socket.emit("updateStatus", {
        type : "ORDER_STATUS",
        status,
        orderId: id,
        userId: orderInfo.Order.userId,
      });
      dispatch(handleOrderStatusById(status, id));
    }
  };
  const handlePaymentStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as PaymentStatus;
    setPaymentStatus(status);

    const orderInfo = singleOrder[0];
    if (id && orderInfo) {
      socket.emit("updateStatus", {
        type : "PAYMENT_STATUS",
        status,
        orderId: id,
        userId: orderInfo.Order.userId,
      });
      dispatch(handlePaymentStatusById(status,id));
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    socket.emit("deleteOrder", { orderId });
  };

  if (!singleOrder || singleOrder.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading order details...
      </div>
    );
  }

  const orderInfo = singleOrder[0];
  const paymentMap: Record<string, PaymentStatus> = {
    paid: PaymentStatus.Paid,
    unpaid: PaymentStatus.Unpaid,
    pending: PaymentStatus.Pending,
  };

  const orderMap: Record<string, OrderStatus> = {
    pending: OrderStatus.Pending,
    delivered: OrderStatus.Delivered,
    ontheway: OrderStatus.Ontheway,
    preparation: OrderStatus.Preparation,
    cancelled: OrderStatus.Cancelled,
    all : OrderStatus.All,
  };

  return (
    <div className="py-20 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      {/* ---------- Header ---------- */}
      <div className="flex flex-col space-y-2 my-2">
        <h1 className="text-2xl font-semibold text-gray-700">Order {id}</h1>
        <p className="text-base text-gray-500 dark:text-gray-400">
          {orderInfo?.createdAt
            ? new Date(orderInfo.createdAt).toLocaleDateString()
            : ""}
        </p>
      </div>

      {/* ---------- Main Layout ---------- */}
      <div className="mt-10 flex flex-col xl:flex-row justify-between items-start w-full xl:space-x-8 space-y-8 xl:space-y-0">
        {/* ---------- Left Section ---------- */}
        <div className="flex flex-col w-full space-y-6 xl:max-h-[80vh] xl:overflow-y-auto pr-2 scrollbar-hide">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col w-full space-y-6 xl:max-h-[80vh] xl:overflow-y-auto  custom-scrollbar scrollbar-hide hover:lg:shadow-xl">
            <p className="text-lg md:text-xl dark:text-white font-semibold mb-4">
              Order Items
            </p>

            {singleOrder.map((order: SingleOrderItem) => (
              <div
                key={order.Order?.id}
                className="flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 border-b border-gray-200 pb-6 mb-4"
              >
                <div className="w-full md:w-36">
                  <img
                    className="w-full rounded-lg object-cover"
                    src={order.Product?.imageUrl}
                    alt={order.Product?.productName}
                  />
                </div>

                <div className="flex w-full md:flex-row justify-between items-center mt-4 md:mt-0">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {order.Product?.productName}
                  </h3>

                  <div className="flex items-center space-x-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      Rs.{order.Product?.price}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      Qty: {order.quantity}
                    </p>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      Rs.{order.Product?.price * order.quantity}
                    </p>
                  </div>
                </div>
              </div>

            ))}
          </div>

          {/* ---------- Order Summary ---------- */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Order Summary
            </h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <p>Payment Method</p>
                <p>{orderInfo?.Order?.Payment?.paymentMethod}</p>
              </div>
              <div className="flex justify-between">
                <p>Payment Status</p>
                <p>{paymentMap[orderInfo?.Order?.Payment?.paymentStatus || "pending"]}</p>
              </div>
              <div className="flex justify-between">
                <p>Order Status</p>
                <p className="transition-all duration-300 ease-in-out">{orderMap[orderInfo?.Order?.orderStatus || "pending"]}</p>
              </div>
              <hr className="my-2 border-gray-300" />
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>Rs. {orderInfo?.Order?.totalAmount - 100}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping (24-hour delivery)</p>
                <p>Rs. 100</p>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-2">
                <p>Total</p>
                <p>Rs. {orderInfo?.Order?.totalAmount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Right Section: Customer Details ---------- */}
        <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 p-6 rounded-xl shadow-sm flex flex-col justify-between space-y-6 xl:sticky xl:top-24">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Customer Details
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Name:</strong> {orderInfo?.Order.User?.username}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Address:</strong> {orderInfo?.Order?.shippingAddress}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Phone:</strong> {orderInfo?.Order?.phoneNumber}
            </p>
          </div>
          <div className="flex w-full justify-center items-center md:justify-start md:items-start">
          <div style={{display:'flex',flexDirection:'column',padding:'18px'}}>
          <div>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Order Status</label>
              <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleOrderStatus} >
              {/* <option value={filteredOrder?.orderStatus}>{filteredOrder?.orderStatus}</option> */}
              <option value="pending">pending</option>
              <option value="delivered">Delivered</option>
            
              <option value="ontheway">Ontheway</option>
              <option value="preparation">Preparation</option>
              <option value="cancelled">Cancelled</option>
              </select>
            </div>

              <div>
              <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Payment Status</label>
              <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handlePaymentStatus}>
        
              <option value="pending">pending</option>
              <option value="paid">paid</option>
              <option value="unpaid">unpaid</option>

              </select>
              </div>
          </div>
          </div>

          

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => handleDeleteOrder(orderInfo?.Order?.id)}
              className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
            >
              Delete Order
            </button>
          </div>
        </div>
        </div>
        </div>

  );
};

export default SingleOrder;
