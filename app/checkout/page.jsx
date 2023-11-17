import React from 'react'
import { GET_PAYMENTGATEWAY_ENDPOINT, WOOCOMMERCE_COUNTRIES_ENDPOINT } from '../utils/constants/endpoints'
import CheckoutForm from '../components/Checkout/CheckoutForm.jsx';
import axios from 'axios';


async function countryData () {
  const res = await fetch(WOOCOMMERCE_COUNTRIES_ENDPOINT);

  if (!res.ok) {
    throw new Error("Failed to fetch Woocommerce Counties")
  }

  return res.json();
}

async function paymentGateway () {
  const res = await fetch (GET_PAYMENTGATEWAY_ENDPOINT);

  if (!res.ok) {
    throw new Error("Failed to fetch Woocommerce payment gateway")
  }

  return res.json();
}

const CheckoutPage = async () => {
  const countriesData = await countryData();
  const Paymentgateway = await paymentGateway();
  return (
    <div>
        <h1>
        Checkout Page
        </h1>
        <CheckoutForm countriesData={countriesData} Paymentgateway={Paymentgateway} />
        </div>
  )
}

export default CheckoutPage