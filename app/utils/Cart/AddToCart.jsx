import axios from "axios";
import { isArray, isEmpty } from "lodash";
import { CART_ENDPOINT } from "../constants/endpoints";
import {getAddOrViewCartConfig} from "./api"
import { storeSession , getSession } from "./session";


export const AddToCart = (productId , qty , setCart , setIsAddedToCart , setLoading) => {

    const storedSession = getSession();
    const addOrViewCartConfig = getAddOrViewCartConfig();

    setLoading(true)


    axios.post(CART_ENDPOINT, {
        "product_id" : productId,
        "quantity" : qty
    },
    addOrViewCartConfig,
    )
    .then ((res)=> {
        

        if (isEmpty(storedSession)){

            storeSession(res?.headers?.['x-wc-session'])
        }
        setIsAddedToCart(true)
        setLoading(false)

        viewCart(setCart);
    })
    .catch((err) => {
    console.log("error :" , err)
    setLoading(false)
    
    }) 

}

export const viewCart = (setCart) => {

    const addOrViewCartConfig = getAddOrViewCartConfig();

    axios.get(CART_ENDPOINT , addOrViewCartConfig)
    .then (res => {
        const formattedCartData = getFormattedCartData(res.data || [])
        setCart (formattedCartData)
        console.log("res :" , res)
    })
    .catch( err => {
        console.log("error :" , err)
    })
}


const getFormattedCartData = (cartData) => {
    if (!cartData.length){
        return null;
    }
    const cartTotal = calculateCartQtyAndPrice(cartData || []);

    return {
        cartItems : cartData ||[] , 
        ...cartTotal
    }
}

const calculateCartQtyAndPrice = (cartItems) => {

    const qtyAndPrice = {
        totalQtn : 0,
        totalPrice : 0 ,
    }


    if (!isArray(cartItems) || !cartItems?.length){
        return qtyAndPrice;
    }

    cartItems.forEach((item)=>{
        qtyAndPrice.totalQtn += item?.quantity ?? 0 ;
        qtyAndPrice.totalPrice += item?.line_total ?? 0;
    })

    return qtyAndPrice;

}