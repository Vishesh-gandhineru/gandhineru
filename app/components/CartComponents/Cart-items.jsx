import React, { useState } from 'react'
import Image from 'next/image'
import { UpdateCart, DeleteCart } from '@/app/utils/Cart/AddToCart';

const CartItem  = ({items, product , setCart }) => {

 const [ChangeQtn , setChageQtn] = useState(items.quantity);

  return (
    <tr key={items.product_id}>
                <td>
                  <div className="relative w-[100%] h-[100px]">
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
                  <div>
                    <input
                      type="number"
                      name="quantity"
                      id="itemQuantity"
                      min={1}
                      value={ChangeQtn}
                      onChange={(e) => {
                      setChageQtn(e.target.value)
                      }}
                    />
                  </div>
                </td>
                <td>{items.line_total}</td>
                <th>
                  <div className="flex justify-evenly">
                    <button
                      className="btn btn-neutral btn-sm"
                      onClick={() => UpdateCart(items.key, ChangeQtn, setCart)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => DeleteCart(items.key , setCart)}
                    >
                      Remove
                    </button>
                  </div>
                </th>
              </tr>
  )
}

export default CartItem