import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard.jsx'
import cards from '../Product/Product.module.css'
import { RingLoader } from 'react-spinners'

function Product() {

   const[product, setProduct]= useState()
   const[isLoading, setisLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setisLoading(true);
        const response = await axios.get('https://fakestoreapi.com/products');
        setProduct(response.data);
        setisLoading(false);
      } catch (error) {
        console.log(error);
        setisLoading(false);
      }
    };
  
    fetchData();
  }, []);

   
  return (
    <>
    {
      isLoading?(<RingLoader/>) : (<section className={cards.productscontainer}>
        {
        product?.map((product) => (
          <ProductCard product={product} key={product.id} AddCartrender={true}/>
        ))}
      </section>)
    }

    </>
  )
}

export default Product
