import React from 'react'
import {BrowserRouter as Router, Routes, Route, redirect} from 'react-router-dom'
import Landing from './Pages/Landing/Landing.jsx'
import Auth from './Pages/Auth/Auth.jsx'
import Payment from './Pages/Payment/Payment.jsx'
import Orders from './Pages/Orders/Orders.jsx'
import Cart from './Pages/Cart/Cart.jsx'
import Results from './Pages/Results/Results.jsx'
import ProductDetail from './Pages/ProductDetail/ProductDetail.jsx'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'

const stripePromise = loadStripe('pk_test_51PKGGkFmKKm5kuMNtckzlmdN7A5yxDfvhzRZRbbf7FC1kvVVXT1QtpVjf8g5NX4SKfEattJEZ4itiePuxd0cuzKQ00dyKOyz7x');


function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route 
          path='/payment' 
          element={
          <ProtectedRoute msg={"Sorry. You must be logged in to pay"} redirect={"/payment"}>
                      
            <Elements stripe={stripePromise}>
            {console.log("Elements wrapper")}
              <Payment />
          </Elements>
          </ProtectedRoute>
          }/>

        <Route path='/orders' element={
          <ProtectedRoute 
            msg={"You must be logged in to see your orders"}
            redirect={"/orders"}
          >
            <Orders/>
          </ProtectedRoute>
          } />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/category/:categoryName' element={<Results/>} />
        <Route path='/products/:productId' element={<ProductDetail/>}/>
      </Routes>
    </Router>
  )
}

export default AppRouter
