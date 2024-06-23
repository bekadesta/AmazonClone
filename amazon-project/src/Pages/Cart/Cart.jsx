import React, { useContext } from 'react'
import LayOut from '../../Components/Layout/LayOut'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard'
import CurencyFormat from '../../Components/Currency/CurrencyFormat';
import { Link } from 'react-router-dom';
import classes from '../Cart/Cart.module.css'
import { Type } from '../../Utility/action.type';

function Cart() {
  const [{basket, user}, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount,item) => {
    return item.price * item.amount + amount
  }, 0)

  const increment = (item)=>{
    dispatch({
      type: Type.ADD_TO_BASKET,
      item
    })
  }

  const decrement = (id)=>{
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id
    })
  }

  
  return (
    <LayOut>
        <section className={classes.container}>
          <div className={classes.cartcontainer}>
            <h1>Hey There</h1>
              <h2>Your Cart</h2>
              <hr />
              {
                basket?.length==0 ? (<p>No Item in your cart</p>) : (
                  basket?.map((item,i)=>{
                    return <section>
                    <ProductCard key={i}
                    product={item}
                    showDescription={true}
                    flex={true}
                    AddCartrender={false  } />
                    <div>
                      <button onClick={()=>increment(item)}>+</button>
                      <span>{item.amount}</span>
                      <button onClick={()=>decrement(item.id)}>-</button>
                    </div>
                    </section>
                  })
                )
              }
          </div> 
          {
            basket?.length !==0 &&(
              <div className={classes.subtotal}>
                <div>
                  <p>Subtotal ({basket?.length} items)</p>
                  <CurencyFormat amount={total}/>
                </div>
                <span>
                  <input type="checkbox" name="" id="" />
                  <small>This Order Contains a gift</small>
                </span>
                <Link to="/payment">
                  Continue to Checkout
                </Link>
              </div>
            )  
          }
          
        </section>
    </LayOut>
  )
}

export default Cart
