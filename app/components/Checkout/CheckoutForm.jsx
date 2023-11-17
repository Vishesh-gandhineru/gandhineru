"use client"
import React, { useContext, useState } from 'react'
import BillingForm from './Billing-form';
import { AppContext } from '@/app/utils/context';
import CheckoutOrder from './CheckoutOrder';
import { isEmpty } from 'lodash';
import Link from 'next/link';


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






const CheckoutForm = ({countriesData , Paymentgateway}) => {
    
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
        payment_method: 'cod',
    };

    const [cart , setCart] = useContext(AppContext);
    const [input , setInput] = useState(initialState);
    
    const handleSubmit = (event) => {
        event.preventDefault();
       }
    
    return (
    <main>
        {cart ? ( <div className='flex justify-between'>
        <form onSubmit={handleSubmit} className='w-[50%]'>
            <div>
            <h2>Billing Details</h2>
            <BillingForm countriesData={countriesData} setInput={setInput} />
            </div>
        </form>
        <div className='w-[40%]'>
            <CheckoutOrder setCart={setCart} cart={cart} Paymentgateway={Paymentgateway} input={input}/>
        </div>
        </div>): (<div className="w-full h-[50vh] flex items-center justify-center flex-col gap-4">
          <h2 className="text-xl">No item inside cart</h2>
          <Link className="btn btn-neutral uppercase" href="/shop">Shop Now</Link>  
        </div>)}
    </main>
  )
}

export default CheckoutForm

