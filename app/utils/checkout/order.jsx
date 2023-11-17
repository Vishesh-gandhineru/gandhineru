import { createCheckoutData, createOrder } from ".";

export const handelPaymentCheckout = async (setIsProcessing , input , cart , Paymentgateway) => {
    setIsProcessing(true)
    const orderData = createCheckoutData(input , cart , Paymentgateway);
    const customOrderData = await createOrder(orderData);
    setIsProcessing(false)

    return customOrderData;
}