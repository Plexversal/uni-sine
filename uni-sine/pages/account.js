
import { useUser, withPageAuthRequired  } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import styles from '../styles/Account.module.css'

export default withPageAuthRequired(function Account() {
    const { user, isLoading, error } = useUser()
    const [loadingProfile, setLoadingProfile] = useState(true)
    const [userData, setUser] = useState()
    
    async function fetchUser() {
        try {
          const response = await fetch(`/api/auth0/auth0-user`);
          const data = await response.json();
          if (!data) {
            throw new Error('Error loading user data');
          }
          setUser(data);
          setLoadingProfile(false);
        } catch (error) {
            throw error
        }
      }
    
      useEffect(() => {
        fetchUser();
      }, []);

    if (!isLoading && !loadingProfile) {
        if(!userData) throw new Error('Account details not available')
        const changePassword = async (e) => {
            e.preventDefault()
            try {
              const response = await fetch('/api/auth0/auth0-password-reset-ticket', {
                headers: {
                  'X-Page-Path': window.location.href
                }
              })
              const data = await response.json()
              Router.push(data.ticket)
            } catch (error) {
              console.log(error)
            }
          }
          
        return (
            <div className={styles['manage-account-container']}>
                <h1>Manage Account</h1>
                <div className={`${styles['account-details-container']} ${styles['options-container']}`}>
                    <h2>Account Details</h2>
                    <ul>
                        <li>
                            <h4>Email</h4>
                            <p>{userData.email}</p>

                        </li>
                        <li>
                            <h4>Sign in method</h4>
                            <p>{userData.identities[0].provider}</p>
                        </li>
                        <li>
                            <h4>Password</h4>
                            {userData.identities[0].isSocial ? <p>Change your password on your social account</p> : <button className={`${styles['account-btn']} ${styles['change-password-btn']}`} onClick={changePassword}>Change Password</button>}
                        </li>
                        <li>
                            <h4>Personal data</h4>
                            <button className={`${styles['account-btn']} ${styles['request-data-btn']}`} >Request Data</button>
                        </li>
                        <li>
                            <h4>Account</h4>
                            <button className={`${styles['account-btn']} ${styles['delete-account-btn']}`} >Delete Account</button>
                        </li>
                    </ul>
                </div>
                <div className={`${styles['account-details-container']} ${styles['options-container']}`}>
                    <h2>Subscription</h2>

                </div>
            </div>
        )
    } else if (isLoading || loadingProfile) {
        return <div>loading</div>
    }

})