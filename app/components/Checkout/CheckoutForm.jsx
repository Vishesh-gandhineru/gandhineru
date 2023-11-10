'use client'

import { useState, useContext } from 'react';
import cx from 'classnames';

// import validateAndSanitizeCheckoutForm from '../../validator/checkout';
import Address from './user-address';
import { AppContext } from '@/app/utils/context';
import CheckboxField from './form-elements/checkbox-field';
import {
	handleBillingDifferentThanShipping,
	handleCreateAccount, handleOtherPaymentMethodCheckout, handleStripeCheckout,
	setStatesForCountry,
} from '../../utils/checkout';

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

const CheckoutForm = ( { countriesData } ) => {

	const { billingCountries, shippingCountries } = countriesData || {};

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

	const [ cart, setCart ] = useContext( AppContext );
	const [ input, setInput ] = useState( initialState );
	const [ requestError, setRequestError ] = useState( null );
	const [ theShippingStates, setTheShippingStates ] = useState( [] );
	const [ isFetchingShippingStates, setIsFetchingShippingStates ] = useState( false );
	const [ theBillingStates, setTheBillingStates ] = useState( [] );
	const [ isFetchingBillingStates, setIsFetchingBillingStates ] = useState( false );
	const [ isOrderProcessing, setIsOrderProcessing ] = useState( false );
	const [ createdOrderData, setCreatedOrderData ] = useState( {} );

	/**
	 * Handle form submit.
	 *
	 * @param {Object} event Event Object.
	 *
	 * @return Null.
	 */
	const handleFormSubmit = async ( event ) => {
		event.preventDefault();

		const billingValidationResult = input?.billingDifferentThanShipping ? validateAndSanitizeCheckoutForm( input?.billing, theBillingStates?.length ) : {
			errors: null,
			isValid: true,
		};
		const shippingValidationResult = validateAndSanitizeCheckoutForm( input?.shipping, theShippingStates?.length );

		setInput( {
			...input,
			billing: { ...input.billing, errors: billingValidationResult.errors },
			shipping: { ...input.shipping, errors: shippingValidationResult.errors },
		} );

		// If there are any errors, return.
		if ( ! shippingValidationResult.isValid || ! billingValidationResult.isValid ) {
			return null;
		}

		// For stripe payment mode, handle the strip payment and thank you.
		if ( 'stripe' === input.paymentMethod ) {
			const createdOrderData = await handleStripeCheckout( input, cart?.cartItems, setRequestError, setCart, setIsOrderProcessing, setCreatedOrderData );
			return null;
		}
		
		// For Any other payment mode, create the order and redirect the user to payment url.
		const createdOrderData = await handleOtherPaymentMethodCheckout( input, cart?.cartItems, setRequestError, setCart, setIsOrderProcessing, setCreatedOrderData );
		
		if ( createdOrderData.paymentUrl ) {
			window.location.href = createdOrderData.paymentUrl;
		}

		setRequestError( null );

	};

	
	const handleOnChange = async ( event, isShipping = false, isBillingOrShipping = false ) => {
		const { target } = event || {};

		if ( 'createAccount' === target.name ) {
			handleCreateAccount( input, setInput, target );
		} else if ( 'billingDifferentThanShipping' === target.name ) {
			handleBillingDifferentThanShipping( input, setInput, target );
		} else if ( isBillingOrShipping ) {
			if ( isShipping ) {
				await handleShippingChange( target );
			} else {
				await handleBillingChange( target );
			}
		} else {
			const newState = { ...input, [ target.name ]: target.value };
			setInput( newState );
		}
	};

	const handleShippingChange = async ( target ) => {
		const newState = { ...input, shipping: { ...input?.shipping, [ target.name ]: target.value } };
		setInput( newState );
		await setStatesForCountry( target, setTheShippingStates, setIsFetchingShippingStates );
	};

	const handleBillingChange = async ( target ) => {
		const newState = { ...input, billing: { ...input?.billing, [ target.name ]: target.value } };
		setInput( newState );
		await setStatesForCountry( target, setTheBillingStates, setIsFetchingBillingStates );
	};

	return (
		<>
			{ cart ? (
				<form onSubmit={ handleFormSubmit } className="woo-next-checkout-form">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-20">
						<div>
							{/*Shipping Details*/ }
							<div className="billing-details">
								<h2 className="text-xl font-medium mb-4">Shipping Details</h2>
								<Address
									states={ theShippingStates }
									countries={ shippingCountries }
									input={ input?.shipping }
									handleOnChange={ ( event ) => handleOnChange( event, true, true ) }
									isFetchingStates={ isFetchingShippingStates }
									isShipping
									isBillingOrShipping
								/>
							</div>
							<div>
								<CheckboxField
									name="billingDifferentThanShipping"
									type="checkbox"
									checked={ input?.billingDifferentThanShipping }
									handleOnChange={ handleOnChange }
									label="Billing different than shipping"
									containerClassNames="mb-4 pt-4"
								/>
							</div>
							{/*Billing Details*/ }
							{ input?.billingDifferentThanShipping ? (
								<div className="billing-details">
									<h2 className="text-xl font-medium mb-4">Billing Details</h2>
									<Address
										states={ theBillingStates }
										countries={ billingCountries.length ? billingCountries: shippingCountries }
										input={ input?.billing }
										handleOnChange={ ( event ) => handleOnChange( event, false, true ) }
										isFetchingStates={ isFetchingBillingStates }
										isShipping={ false }
										isBillingOrShipping
									/>
								</div>
							) : null }

						</div>
						
					</div>
				</form>
			) : null }
		</>
	);
};

export default CheckoutForm;