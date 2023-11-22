import { getAllProductVariation } from "@/app/utils/products";
import React from "react";
import Image from "next/image";
import ProductSinglePageAddToCart from "./ProductSinglePageAddToCart";


const ProductSinglePage = async ({ data }) => {
  const productVariation = await getAllProductVariation(data.id);
  const variations = productVariation?.data ?? {};
  return (
    <div className="bg-white p-6">
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-sm w-full lg:max-w-full lg:grid grid-cols-2">
          {/* Image source would go here */}
          <div className="relative w-full h-full bg-slate-50 mb-3">
            <Image
              src={data.images[0].src}
              alt=""
              className=" absolute object-contain mb-4"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
              fill
            />
          </div>
          <div className=" bg-white  p-4 flex flex-col justify-between leading-normal">
              <ProductSinglePageAddToCart data={data} variations={variations}/>         
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSinglePage;
