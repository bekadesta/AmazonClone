import React, {useState, useEffect} from 'react'
import Layout from '../../Components/Layout/LayOut.jsx'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../API/EndPoint.js'
import ProductCard from '../../Components/Product/ProductCard.jsx'
import {RingLoader} from 'react-spinners'


function ProductDetail() {
  const [products, setProducts] = useState({})
  const [isLoading, setisLoading] = useState(false)
  const {productId} = useParams()
  console.log(productId)

  
  useEffect(() => {
    setisLoading(true)
    const fetchProductid = async () => {
      try {
        const res = await axios.get(`${productUrl}products/${productId}`);
        setProducts(res.data);
        setisLoading(false)
        console.log(res.data)
      } catch (error) {
        console.log(error);
        setisLoading(false)
      }
    };
  
    fetchProductid();
  }, [productId]);

  console.log(products)
  return (
    <Layout>
      {isLoading ? (<RingLoader/>): (<ProductCard product={products} key={productId} flex={true} showDescription={true} AddCartrender={true}/>)}
      
    </Layout>
  )
}


export default ProductDetail
