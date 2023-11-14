"use client";
import React, { useContext, useState } from "react";
import { AddToCart } from "@/app/utils/Cart/AddToCart";
import { isEmpty } from "lodash";
import { AppContext } from "@/app/utils/context";
import cx from "classnames";
import Link from "next/link";

const AddToCartBtn = ({ product }) => {
  const [cart, setCart] = useContext(AppContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [loading, setLoading] = useState(false);

  const addToCartBtnClassess = cx("btn btn-neutral mt-3", {
    "btn btn-neutral mt-3": !loading,
    "btn btn-disabled mt-3": loading,
  });

  const [quantity, setQuantity] = useState(Number(1));

  if (isEmpty(product)) {
    return null;
  }

  return (
    <div className="flex flex-row justify-center items-center gap-5 mt-3">
      {loading ? (
        <div className="toast toast-top toast-center">
          <div className="alert bg-[black]">
            <span className="loading loading-spinner text-white"></span>
            <span className="text-white font-bold">Adding to Cart</span>
          </div>
        </div>
      ) : (
        ""
      )}

      {isAddedToCart ? (
        <Link className="btn btn-neutral w-1/2" href="/cart">
          View Cart
        </Link>
      ) : (
        <button
          className="btn btn-neutral w-1/2"
          onClick={() =>
            AddToCart(
              product?.id ?? 0,
              quantity,
              setCart,
              setIsAddedToCart,
              setLoading,
              setQuantity
            )
          }
          disabled={loading}
        >
          add to cart
        </button>
      )}
      <input
        type="number"
        name="quantity"
        id="productQuantity"
        min={1}
        placeholder="1"
        value={quantity}
        className="input input-bordered w-1/2"
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      />
    </div>
  );
};

export default AddToCartBtn;
