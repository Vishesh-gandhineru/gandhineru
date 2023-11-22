"use client";

import { useState } from "react";
import AddToCartBtn from "./AddToCartBtn";
const ProductSinglePageAddToCart = ({ data, variations }) => {
  const [ProductPrice, setProductPrice] = useState(data.price);

  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value)
  };

  return (
    <div>
      <div>
        <div className="text-black font-bold text-xl mb-2">{data.name}</div>
      </div>
      <div className="flex items-center">
        <div className="text-xl text-black font-semibold">{ProductPrice}</div>
      </div>
      <div className="mt-4">
        <div className="flex mb-4">
          {variations ? (<div className="w-1/2">
            <label
              htmlFor="size-select"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Select Size:
            </label>
            <select
              id="size-select"
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={handleProductPriceChange}              >
              {variations.map((variant) => {
                return (
                  <option key={variant.id} value={variant.price}>
                    {variant.name}
                  </option>
                );
              })}
            </select>
          </div>) : ("")}
        </div>
        
      </div>
      <div className="flex items-center justify-between mt-4">
        <AddToCartBtn product={data} />
      </div>
    </div>
  );
};

export default ProductSinglePageAddToCart;
