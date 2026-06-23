import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import Title from '../components/Title'

import ProductItem from '../components/ProductItem'


const RelatedProduct = ({category,subCategory}) => {
    const {product} = useContext(shopContext)
    const [related,setRelated] = useState([])
    useEffect(() => {
      if(product.length > 0){
        let productCopy =product.slice() ;
        productCopy = productCopy.filter((item)=>category === item.category);
        productCopy = productCopy.filter((item)=>subCategory === item.subCategory)
        setRelated(productCopy.slice(0,5))

      }
    
     
    }, [product])
    
  return (
    <div className='my-24'>
        <div className="text-3xl text-center py-2">
            <Title text1={"RELATED"} text2={'product'} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
            {related.map((item,index)=>(
                <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} key={index} />
            ))}
        </div>
    </div>
  )
}

export default RelatedProduct