import React from "react"
import styles from '../../styles/Nav.module.css'
import Link from 'next/link'
import OfferBanner from "./OfferBanner";

function Nav({user, isLoading}) {

  return (
    <div id={styles.navbar}>
        <OfferBanner user={user} isLoading={isLoading}/>
      <div className={styles['nav-content']}>
        <div className={styles["nav-container"]}>
          <Link href="/">Uni-Sine</Link>
        </div>
      </div>
    </div>
  );
}

export default Nav