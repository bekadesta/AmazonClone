import React, { useContext, useState} from 'react';
import LayOut from '../../Components/Layout/LayOut';
import classes from "./Payment.module.css";
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/Currency/CurrencyFormat';
import {axiosInstance} from '../../API/axios'
import {ClipLoader} from 'react-spinners'
import {db} from "../../Utility/Firebase"
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';


function Payment() {

  const [{ user, basket }, dispatch] =  useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0) 
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false)
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate()


  const handleChange = (event) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(null);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      
      // backend || contact functions - to connect to the client secret key
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
  
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;
  
      // Confirm client or react side (Confirmation from stripe)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(paymentIntent);
  
      // After the paymentIntent save order Firestore database, clear basket
      await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
      //Empty the basket
      dispatch({type : Type.EMPTY_BASKET });

      setProcessing(false);
      navigate('/orders', {state:{msg:"You have palced a new order"}});
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
  




  return (
    <LayOut>
      <div className={classes.payment_header}>
        Checkout ({totalItem}) items
      </div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>streetaddress</div>
            <div>city</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review Items and delivery</h3>
          <div>
            {basket.map((item) => <ProductCard key={item.id} product={item} flex={true} />)}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>

                {cardError && <small>{cardError}</small>}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{display: "flex", gap: "40px"}}>
                      <p>Total Order |</p> <CurrencyFormat amount={total}/>            
                    </span>
                  </div>
                  <button type='submit'>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color='gray' size={12}/>
                        <p>Please Wait ... </p>
                      </div>
                    ) : ("Pay Now")}
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
