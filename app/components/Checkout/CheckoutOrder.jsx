import React from "react";

const CheckoutOrder = ({ cart, setCart }) => {
  const cartProduct = cart.cartItems;
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
                  <td>{item.currency}{item.line_subtotal}</td>
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
    </div>
  );
};

export default CheckoutOrder;
