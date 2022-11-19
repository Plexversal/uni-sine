import React, { useEffect, useState } from "react"
import styles from '../../styles/Banner.module.css'
import Link from 'next/link'
import {BsFacebook, BsTwitter, BsYoutube} from 'react-icons/bs'




function Nav(props) {

    
    return (
    <div id={styles.banner}>
        <div className={styles.container}>
            <div className={styles["banner-container"]}>
                <h1>{props.title}</h1>
                <p className={styles.subheader}>{props.subheader}</p>

            
            </div>
            <ul>
                <li><BsTwitter size='1.5rem'/></li>
                <li><BsFacebook size='1.5rem' /></li>
                <li><BsYoutube size='1.5rem'/></li>
            </ul>
        </div>

    </div>
    )
  }

export default Nav