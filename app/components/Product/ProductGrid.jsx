
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { sanitize, isSupported } from "isomorphic-dompurify";
import AddToCartBtn from "./AddToCartBtn";
const DOMPurify = require('isomorphic-dompurify');


const ProductGrid = ({product}) => { 


    return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
      {product.map((item) => {
        return (
          <div key={item.id} className="border p-4 flex flex-col justify-between">
          
              <div className="relative w-full h-[250px] bg-slate-50 mb-3">
              <Image
                className=" absolute object-cover mb-4"
                src={item?.images[0]?.src ?? ""}
                alt="Next.js Logo"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"             
                 priority
              />
              </div>
              <div className="NamePrice">
              <h4 className="text-lg font-semibold mb-2">{item?.name ?? ""}</h4>
              
              <div className="font-bold text-lg" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(item?.price_html ?? "")}} />
              </div>
       
            { item.type === "simple" ? <AddToCartBtn product={item}/> : ""}
            
            

          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
