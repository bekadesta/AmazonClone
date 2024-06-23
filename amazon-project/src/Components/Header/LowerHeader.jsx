import React from 'react';
import styles from '../Header/Header.module.css';
import { HiMenu } from "react-icons/hi";

function LowerHeader() {
  return (
    <div className={styles.lowerheader}>
      <ul>
        <li>
          <HiMenu />
          <span>All</span>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>

      </ul>
    </div>
  );
}

export default LowerHeader;
