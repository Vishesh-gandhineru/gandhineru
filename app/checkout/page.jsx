import React from 'react'
import { WOOCOMMERCE_COUNTRIES_ENDPOINT } from '../utils/constants/endpoints'
import CheckoutForm from '../components/Checkout/CheckoutForm';


async function getData () {
  const res = await fetch(WOOCOMMERCE_COUNTRIES_ENDPOINT , {
    revalidate: 1
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Woocommerce Counties")
  }

  return res.json();
}

const CheckoutPage = async () => {

  const countriesData = await getData();
  return (
    <div>
        <h1>
        Checkout Page
        </h1>

        <CheckoutForm countriesData={countriesData} />
        </div>
  )
}

export default CheckoutPage