import React from "react"
import styles from '../../styles/Nav.module.css'
import Link from 'next/link'

function Nav() {
    return (
    <div id={styles.navbar}>
        <div className={styles["nav-container"]}>
            <Link href='/'>Uni-Sine</Link>
        </div>
    </div>
    )
  }

export default Nav