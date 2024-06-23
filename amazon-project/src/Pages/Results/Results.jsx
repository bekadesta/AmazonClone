import React, { useEffect, useState } from 'react'
import { productUrl } from '../../API/EndPoint.js'
import LayOut from '../../Components/Layout/LayOut.jsx'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import cards from '../Results/Results.module.css'
import ProductCard from '../../Components/Product/ProductCard.jsx'
import { RingLoader } from 'react-spinners'


function Results() {
  const [results, setResults] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const {categoryName} = useParams()
  // console.log(categoryName)

  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // setisLoading(true)
        const response = await axios.get(`${productUrl}products/category/${categoryName}`);
        setResults(response.data);
        console.log(response.data)

      } catch (error) {
        console.log(error);
        setisLoading(false)
      }
    };
  
    fetchProducts();
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        <h1 style={{padding: "30px"}}>Results</h1>
        <p style={{padding: "30px"}}>Category / {categoryName}</p>
        <hr />
        {isLoading ? (<RingLoader/>) : (<div className={cards.productscontainer}>
          {results && results?.map((product) => (
            <ProductCard key={product.id}  product={product} 
            showDescription={false}
            AddCartrender={true}/>
          ))}
        </div>)}
        

      </section>
    </LayOut>
  )
}

export default Results
