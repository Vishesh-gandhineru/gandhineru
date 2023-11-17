const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

export const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
});

export async function POST(req , res) {
 
const request = await req.json();

let response = {
	orderId: null,
	total: "",
	currency: "",
	error: "",
	payment_url : "",
  };

	await api.post("orders" , request)

	.then ((result)=> {

		 console.log(result)
		if (result.error) {
			response.error = result.error;
		  }
		  response.orderId = result.data.order_key ?? "";
		  response.total = result.data.total ?? "";
		  response.currency = result.data.currency ?? "";
		  response.payment_url = result.data.payment_url ?? "";
	})

 .catch ((error=>{
	 return new Response("error" ,{status : 500})

 })) 	


 return Response.json(response)
}


