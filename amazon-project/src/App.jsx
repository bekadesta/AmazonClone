// import logo from './logo.svg';
import { useContext, useEffect } from 'react';
import './App.css';
import AppRouter from './AppRouter.jsx';
import { DataContext } from './Components/DataProvider/DataProvider.jsx';
import { Type } from './Utility/action.type.js';
import {auth} from './Utility/Firebase.js'


function App() {
  const[{user}, dispatch] = useContext(DataContext)
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
      }else{
        dispatch({
          type:Type.SET_USER,
          user:null
        })
      }
    })
  },[])
  return (
    <>
    <AppRouter />
    </>

  );
}

export default App;
