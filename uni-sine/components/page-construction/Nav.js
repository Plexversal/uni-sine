import React from "react"
import styles from '../../styles/Nav.module.css'
import Link from 'next/link'
import OfferBanner from "./OfferBanner";

function Nav() {

  return (
    <div id={styles.navbar}>
        <OfferBanner />
      <div className={styles['nav-content']}>
        <div className={styles["nav-container"]}>
          <Link href="/">Uni-Sine</Link>
        </div>
      </div>
    </div>
  );
}

export default Nav