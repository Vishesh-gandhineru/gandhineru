"use client";

import { AppContext } from "@/app/utils/context";
import React, { useState } from "react";
import Image from "next/image";
import { useContext } from "react";
import { UpdateCart, clearFullCart } from "@/app/utils/Cart/AddToCart";
import CartItems from "./Cart-items";
import Link from "next/link";

const AddedCartList = () => {
  const [cart, setCart] = useContext(AppContext);
  const cartItemData = cart?.cartItems ?? "";

  return (
    <>
      {cart ? (
        <div className="flex justify-between gap-10">
          <div className="overflow-x-auto w-[70%]">
            <table className="table">
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItemData.map((items) => {
                  return (
                    <CartItems
                      key={items.product_id}
                      items={items}
                      setCart={setCart}
                      products={cartItemData}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="w-[30%] flex flex-col gap-10">
            <div className="border p-5 border-black rounded flex flex-col gap-4">
              <div className="text-2xl font-bold">
                Total Quantity : {cart.totalQtn}
              </div>
              <div className="text-2xl font-bold">
                Total Price : {cart.totalPrice}
              </div>
            </div>
            <div className="flex justify-evenly">
              <button
                className="btn btn-error"
                onClick={() => clearFullCart(setCart)}
              >
                Clear Cart
              </button>
              <Link href='/checkout' className="btn btn-success">Process to Checkout</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[50vh] flex items-center justify-center flex-col gap-4">
          <h2 className="text-xl">No item inside cart</h2>
          <Link className="btn btn-neutral uppercase" href="/shop">Shop Now</Link>  
        </div>
      )}
    </>
  );
};

export default AddedCartList;
