import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { CiLocationOn } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { BiCart } from "react-icons/bi";
import LowerHeader from './LowerHeader.jsx';
import styles from './Header.module.css'
import { DataContext } from '../DataProvider/DataProvider.jsx';
import { auth } from '../../Utility/Firebase.js';

function Header() {
    const [{basket, user}, dispatch] = useContext(DataContext)

  return (
    <section className={styles.stickyheader}>
    <section>     
        <div className={styles.headercontainer}>
            <div>
                <div className={styles.logocontainer}>
                    <Link to='/'>
                        <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="LOGO"/>
                    </Link>
                 </div>                
            </div>
            <div>
            <div className={styles.delivery}>
                <span>
                    <CiLocationOn />
                </span>
                <div>
                    <p>Delivered To</p>
                    <span>Ethiopia</span>
                </div> 
                </div> 
            </div>

            <div className={styles.searchbar}>
                <select name='' id=''>
                    <option value="">All</option>
                </select>
                <input type='text' name='' id='' placeholder='Search Here'></input>
                <CiSearch size={29}/>
            </div>

            <div>
                <div className={styles.ordercontainer}>
                    <Link to='' className={styles.languages}>
                    <div className={styles.flag}>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg' alt='Flag Of the States' />
                        <select>
                             <option value="">
                                  EN
                            </option>
                        </select>
                    </div>
                    </Link>
                    <Link to={!user && '/auth'}>
                        <div>
                            {
                                user?(
                                    <>
                                    <p>Hello {user?.email?.split("@")[0]}</p>
                                    <span onClick={()=>auth.signOut()}>Sign Out</span>
                                    </>
                                ) : (
                                    <>
                                    <p>Hello, Sign In</p>
                                    <span>Accounts & Lists</span>
                                    </>
                                )
                            }                   
                        </div>
                    </Link>
                    <Link to='/payment'>
                        <p>Returns</p>
                        <span>& Orders</span>
                    </Link>

                    <Link to='/cart' className={styles.cart}>
                    <BiCart size={35}/>
                    <span>{basket.length}</span>
                    </Link>
                </div>
            </div>
        </div>  
    </section>
    <LowerHeader />
    </section>
  )
}

export default Header
