
import React from 'react'
import { getProductBySlug , getProductsData } from '@/app/utils/products'
import ProductSinglePage from '@/app/components/Product/ProductSinglePage';
import { useRouter } from 'next/navigation';

export async function generateStaticParams () {
    let slug = [];
    const {data} = await getProductsData();

   
    data.map(product => {
        return slug.push({slug : product.slug})
    })
    
    return slug;
}

export async function getProduct (params){

    const {slug} = params;

    const product = await getProductBySlug(slug)

    return product.data[0];
    
}

const productSinglePage = async ({params}) => {

    const productData = await getProduct(params);
    
    return (
    <div>product name : {productData.name}
    <ProductSinglePage data={productData} />
    </div>
  )
}

export default productSinglePage