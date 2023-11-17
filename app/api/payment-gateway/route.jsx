
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

export const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3"
});



export async function GET(req, res){

      const responseData = {
        success: false,
        products: []
      }
     
 
      try {
        const {data} = await api.get(
          "payment_gateways");
  
        responseData.success = true;
        responseData.products = data;
  
        res.json( responseData );
  
      } catch ( error ) {
        responseData.error = error.message;
       
      }
      return  Response.json(responseData.products)
    }


