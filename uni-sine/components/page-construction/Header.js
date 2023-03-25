import React from "react"
import { useUser } from '@auth0/nextjs-auth0/client';
import styles from '../../styles/Home.module.css'

const Header = (props) => {
  const { user, error, isLoading } = useUser();

    return (
        <header className={styles['header']}>
            <div className={styles['logo']}>
                <h1>Uni-Sine</h1>
                <p>Learning</p>
            </div>
            <div className={styles['account-actions']}>
                {
                    !isLoading && user ?
                        <div className={styles['signed-in-info']}>
                            <h1>{user.name}</h1>

                            <div className={styles['signed-in-actions']}>
                                <a href='/account'>Manage Account</a>
                                <a href='/api/auth/logout'>Logout</a>
                            </div>


                        </div>
                        :
                        <>
                            <a href='/api/auth/login' className={`${styles['join-link']} ${styles['acc-btn']}`}>Join</a>
                            <a href='/api/auth/login' className={`${styles['sign-in-link']} ${styles['acc-btn']}`}>Sign in</a>
                        </>
                }

            </div>
        </header>
    )
};

export default Header;
