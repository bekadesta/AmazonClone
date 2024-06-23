import React, { useState, useContext} from 'react'
import classes from './SignUp.module.css'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { auth } from '../../Utility/Firebase.js';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import {DataContext} from '../../Components/DataProvider/DataProvider.jsx'
import { Type } from '../../Utility/action.type.js';
import {ClipLoader} from "react-spinners";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState({
      signIn: false,
      signUp: false
    })

    const [{user}, dispatch] = useContext(DataContext)
    // console.log(user)
    const navigate = useNavigate()
    const navStateData = useLocation();
    


    const authHandler = async (e)=>{
      e.preventDefault();
      console.log(e.target.name)
      if(e.target.name === "signin"){
        // start authentication from firebase
        setLoading({...loading, signIn:true})
        signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo)
          dispatch({
            type: Type.SET_USER,
            user:userInfo.user
          })
          setLoading({...loading, signIn: false})
          navigate(navStateData?.state?.redirect || "/");
        }).catch((err)=> {
          setError(err.message)
          setLoading({...loading, signIn: false})

        })
      }else{
          setLoading({...loading, signUp: true})
          createUserWithEmailAndPassword(auth, email, password)
          .then((userInfo)=>{
            console.log(userInfo)
            dispatch({
              type: Type.SET_USER,
              user:userInfo.user
            })
          setLoading({...loading, signUp: false})
          navigate(navStateData?.state?.redirect || "/");
          }).catch((err)=> {
            setError(err.message)
          setLoading({...loading, signUp: false})

          })
      }
    } 
    
    
  return (
    <section className={classes.login}>
      {/* logo */}
     <Link to="/">
      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="" />
     </Link>
     <div className={classes.container}>
      <h1>
        Sign-In
      </h1>
      {
        navStateData?.state?.msg &&  (
          <small style={{padding: "5px", textAlign: "center", color: "red", fontWeight: "bold", }}>
            {navStateData?.state?.msg}
          </small>
        )
      }
      <form action=''>
        <div>
        <label htmlFor='email'>Email</label>
        <input 
        type='email'
         id='email'
         value={email}
         onChange={(e) => setEmail(e.target.value)}
        />
        </div>

        <div>
        <label htmlFor='password'>Password</label>
        <input type='password' 
        id='password'
        value={password}
         onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button type='submit' onClick={authHandler} name='signin' className={classes.signinbutton}>
          {
            loading.signIn ? (
            <ClipLoader color='#febd69' size={16}></ClipLoader>
          ): (
            " SignIn"
          )
          }
        </button>
      </form>
      <p>
        By Signing-in you are agreeing to the amazon FAKE
        clone terms and conditions. Make sure you have read the 
        terms thoroughly.
      </p>
      <button type='submit' name='signup'  onClick={authHandler}  className={classes.registeraccount}>
        {
          loading.signUp ? (
            <ClipLoader size={16}></ClipLoader>
          ) : (
            "Create an account"
          )
        }
      </button>
      {
        error && <small style={{paddingTop:"5px", color:"red"}}>{error}</small>
      }
     </div>
      {/* Form */}
    </section>
  )
}

export default Auth
