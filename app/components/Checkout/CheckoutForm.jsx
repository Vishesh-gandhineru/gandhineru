"use client"

import React, { useContext, useState } from 'react'
import BillingForm from './Billing-form';
import { AppContext } from '@/app/utils/context';
import CheckoutOrder from './CheckoutOrder';


// Use this for testing purposes, so you dont have to fill the checkout form over an over again.
// const defaultCustomerInfo = {
// 	firstName: 'Imran',
// 	lastName: 'Sayed',
// 	address1: '123 Abc farm',
// 	address2: 'Hill Road',
// 	city: 'Mumbai',
// 	country: 'IN',
// 	state: 'Maharastra',
// 	postcode: '221029',
// 	email: 'codeytek.academy@gmail.com',
// 	phone: '9883778278',
// 	company: 'The Company',
// 	errors: null,
// };

const defaultCustomerInfo = {
	firstName: '',
	lastName: '',
	address1: '',
	address2: '',
	city: '',
	country: '',
	state: '',
	postcode: '',
	email: '',
	phone: '',
	company: '',
	errors: null
}





const handleSubmit = (event) => {
    event.preventDefault();

    console.log("form submitted")

}

const CheckoutForm = ({countriesData}) => {

    const initialState = {
        billing: {
            ...defaultCustomerInfo,
        },
        shipping: {
            ...defaultCustomerInfo,
        },
        createAccount: false,
        orderNotes: '',
        billingDifferentThanShipping: false,
        paymentMethod: 'cod',
    };

    const [cart , setCart] = useContext(AppContext);
    const [input , setInput] = useState(initialState);

    console.log(input)
  return (
    <main>
        <div className='flex justify-between'>
        <form onSubmit={handleSubmit} className='w-[50%]'>
            <div>
            <h2>Billing Details</h2>
            <BillingForm countriesData={countriesData} setInput={setInput} />
            </div>
        </form>
        <div className='w-[40%]'>
            <CheckoutOrder setCart={setCart} cart={cart} />
        </div>
        </div>
    </main>
  )
}

export default CheckoutForm

