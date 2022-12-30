import React, { useEffect, useState } from "react"
import styles from '../../styles/Banner.module.css'
import Link from 'next/link'
import {BsFacebook, BsTwitter, BsYoutube} from 'react-icons/bs'
import Head from "next/head"
function Nav(props) {

    const [URL, setURL] = useState(null)
    useEffect(() =>{
        setURL(document.URL)
    })

    
    return (
        <div className={styles['banner-container']}>
             <Head>
                <title>Uni-Sine: {props.title}</title>
            </Head>
            <div className={styles['banner-main-content']}>
                <div className={styles["banner-content"]}>
                    <h1>{props.title}</h1>
                    <p className={styles.subheader}>{props.subheader}</p>
                </div>
                <ul>
                    <li>
                        <a className={styles['social-link-tw']} rel="noreferrer" target='_blank' 
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${URL}!`)}`}>
                        <BsTwitter size='1.5rem'/></a>
                    </li>
                    <li>
                        <a className={styles['social-link-fb']} rel="noreferrer" target='_blank'
                        href={`https://www.facebook.com/sharer.php?t=${encodeURIComponent(`Uni-Sine`)}&u=${encodeURIComponent(`Check out ${URL}!`)}`}>

                        <BsFacebook size='1.5rem' />
                        </a>
                    </li>
                    <li>
                        <a rel="noreferrer" target='_blank' href="https://google.com"><BsYoutube size='1.5rem'/></a>
                    </li>
                </ul>
            </div>
        
            {props.search?.()}
            
            
        </div>


    )
  }

export default Nav