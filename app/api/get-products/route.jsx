
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
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
  
      const { perPage } = req?.query ?? {};
  
      try {
        const {data} = await api.get(
          'products',
          {
            per_page: perPage || 10
          }
        );
  
        responseData.success = true;
        responseData.products = data;
  
        res.json( responseData );
  
      } catch ( error ) {
        responseData.error = error.message;
       
      }
      return  Response.json(responseData.products)
    }


