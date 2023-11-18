
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Page.module.css'

export default function Unverified({user}) {

  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    
    if (user) {
      Router.push('/');
    }

  })

  return (
 <>
 {user ? <></> :   
    <div className={styles['unverified-container']}>
      <h1>Verify your email</h1>
      <p>Check your email for a verification link or <Link href={'/contact'}>Contact support</Link></p>
    </div>}
 </>

  )
}