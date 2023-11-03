import React from 'react'
import ProductGrid from '../components/Product/ProductGrid'
import {GET_PRODUCT_ENDPOINT} from '../utils/constants/endpoints'

async function getData() {
  const res = await fetch(GET_PRODUCT_ENDPOINT , {
    revalidate: 1
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const ShopPage = async () => {

  const ProductData = await getData();

  return (
    <div>
        <h1 className='mb-10'>Shop Page </h1>
        <ProductGrid product={ProductData}/>
        </div>
  )
}

export default ShopPage