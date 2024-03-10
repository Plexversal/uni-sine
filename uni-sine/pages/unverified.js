
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Page.module.css'
import { useUserContext } from '../contexts/UserContext';
export default function Unverified() {

  const { user, isLoading } = useUserContext();

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