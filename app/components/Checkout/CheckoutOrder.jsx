
import { createCheckoutData, createOrder } from '@/app/utils/checkout';
import { handelPaymentCheckout } from '@/app/utils/checkout/order';
import { useState } from 'react';


const CheckoutOrder = ({ cart, setCart, Paymentgateway, input }) => {


  const [isProcessing , setIsProcessing] = useState(false);
  const [paymentUrl , setPaymentUrl] = useState("");

  const cartProduct = cart?.cartItems ?? "";

  const cartItem = cartProduct.map((item) => ({
    product_id: item.product_id,
    quantity: item.quantity,
  }));

 

  

  const handelCreateOrder = async () => {
    
    // const customerCreateOrder = await createOrder(orderData , setIsProcessing);
    const createOrderData = await handelPaymentCheckout(setIsProcessing , input , cart , Paymentgateway);
    
    
    if ( createOrderData.paymentUrl ) {
      setPaymentUrl(createOrderData.paymentUrl)
      window.location.href = createOrderData.paymentUrl;
		}

  }

  console.log(paymentUrl)
  console.log(isProcessing)


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
        <div>{Paymentgateway.title} -- razorpay</div>
        <button className="btn btn-primary" onClick={handelCreateOrder}>
          place order
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrder;
