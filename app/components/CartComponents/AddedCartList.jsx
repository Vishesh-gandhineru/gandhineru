"use client"

import Image from 'next/image';
import React, { useEffect, useState } from "react";

const AddedCartList = () => {


    let cartData = localStorage.getItem("next-cart");
    cartData = null !== cartData ? JSON.parse(cartData) : "";
  
    const cartItemData = cartData.cartItems;

  return (
    <div className="overflow-x-auto">
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
                  <>
                  <tr>
                   
                    <td>                      
                        <div className="relative w-[65%] h-[100px]">
                          <Image
                            className=" absolute object-cover mb-4"
                            src={items.data.images[0].src}
                            alt="Next.js Logo"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority
                          />
                        </div>
                    </td>
                    <td>
                    <div className="font-bold">{items.data.name}</div>
                    </td>
                    <td>
                      {items.quantity}
                    </td>
                    <td>{items.price}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">Update</button>
                    </th>
                  </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
      
  )
}

export default AddedCartList