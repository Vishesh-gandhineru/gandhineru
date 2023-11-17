
import { createCheckoutData, createOrder } from '@/app/utils/checkout';
import { POST_ORDER_ENDPOINT } from '@/app/utils/constants/endpoints';
import axios from 'axios';
import {parse, stringify, toJSON, fromJSON} from 'flatted';

const CheckoutOrder = ({ cart, setCart, Paymentgateway, input }) => {
  const cartProduct = cart?.cartItems ?? "";

  const cartItem = cartProduct.map((item) => ({
    product_id: item.product_id,
    quantity: item.quantity,
  }));

  

  const handelCreateOrder = async () => {
    const orderData = createCheckoutData(input , cart , Paymentgateway);
    const customerCreateOrder = await createOrder(orderData);

    return customerCreateOrder;
  }


  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Product</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {cartProduct.map((item) => {
              return (
                <tr key={item.product_id}>
                  <td> {item.data.name}</td>
                  <td>
                    {item.currency}
                    {item.line_subtotal}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>Subtotal</td>
              <td>₹{cart.totalPrice}</td>
            </tr>
            <tr>
              <td className="font-bold">Total</td>
              <td className="font-bold">₹{cart.totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bordered border-black">
        <div>{Paymentgateway.title}</div>
        <button className="btn btn-primary" onClick={handelCreateOrder}>
          place order
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrder;
