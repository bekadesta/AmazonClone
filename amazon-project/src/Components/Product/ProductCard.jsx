import React, { useContext } from 'react'
import Rating from '@mui/material/Rating'
import CurencyFormat from '../Currency/CurrencyFormat'
import cards from '../Product/Product.module.css'
import { Link } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'

function ProductCard({product, flex, showDescription, AddCartrender}) {
  const {id, title, price, image, rating, description} = product
  const rate = rating?.rate; // Access rate property if rating object exists
  const count = rating?.count; // Access count property if rating object exists
 
  const [state, dispatch] = useContext(DataContext)
  // When DataContext is passed it returns state and dispatch
  const addToCart = ()=> {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id, title, price, image, rating, description
      }
    })
  }
// Add to cart works on the dispatching


  return (
    <div>
      <div className={`${cards.cardcontainer} ${flex ? cards.productflexed : ''}`}>
      <Link to={`/products/${id}`}>
        <img className={cards.image_container} src={image} alt='Picture'/>
      </Link>
      <div>
        <h3>{title}</h3>
        {showDescription && <div style={{maxWidth:"500px"}}>{description}</div>}
        <div className={cards.rates}>
        {rate && <Rating value={rate} precision={0.5} />}
            {count && <small>{count}</small>}
        </div>
        <div>
            <CurencyFormat amount={price}/>
        </div> 
        {
          AddCartrender && <button className={cards.button} onClick={addToCart}>
          Add to cart
        </button>
        }

      </div>
      </div>
    </div>
  )
}

export default ProductCard
