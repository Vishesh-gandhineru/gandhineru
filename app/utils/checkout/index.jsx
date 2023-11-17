export const line_items = (cart) => {
    const cartProduct = cart.cartItems;
   return cartProduct.map(({product_id ,quantity}) => ({
        "product_id": product_id,
        "quantity": quantity,
      }));
}


export const createCheckoutData = (input, cart, Paymentgateway) => {
    const billing = input.billing;
    const shipping = input.shipping
    return {
        billing: {
            first_name: billing.firstName,
            last_name: billing.lastName,
            address_1: billing.address1,
            address_2: billing.address2,
            city: billing.city,
            country: billing.country,
            state: billing.state,
            postcode: billing.postcode,
            email: billing.email,
            phone: billing.phone,
            company: billing.company
        },
        shipping: {
            first_name: billing.firstName,
            last_name: billing.lastName,
            address_1: billing.address1,
            address_2: billing.address2,
            city: billing.city,
            country: billing.country,
            state: billing.state,
            postcode: billing.postcode,
            email: billing.email,
            phone: billing.phone,
            company: billing.company
        },
        payment_method: input.payment_method,
        line_items: line_items(cart),
        payment_method_title: Paymentgateway.title,
        set_paid: false
    }

}



export const createOrder = async (orderData) => {
    let response = {
		orderId: null,
		total: '',
		currency: '',
		error: '',
	};
		
	try {
		const request = await fetch( '/api/create-order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( orderData ),
		} );
		
		const result = await request.json();
		if ( result.error ) {
			response.error = result.error;
		}
		response.orderId = result?.orderId ?? '';
		response.total = result.total ?? '';
		response.currency = result.currency ?? '';
		response.paymentUrl = result.paymentUrl ?? '';
		
	} catch ( error ) {
		// @TODO to be handled later.
		console.warn( 'create order error', error?.message );
	}
	
	return response;


}