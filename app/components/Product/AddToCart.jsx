'use client'
import React from 'react'
import { ProductToCart } from '@/app/utils/Cart/ProductToCart'

const AddToCart = ({product}) => {

  
  
    return (
    <button className='btn btn-neutral mt-3' onClick={() => ProductToCart( product?.id ?? 0)}>add to cart</button>
  )
}

export default AddToCart