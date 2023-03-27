import React from "react"
import { useUser } from '@auth0/nextjs-auth0/client';
import styles from '../../styles/Home.module.css'
import Link from "next/link";
import Image from 'next/image'
const Header = (props) => {
    const { user, error, isLoading } = useUser();
    console.log(user)
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
                            <Image height={50} width={50} src={user?.picture}></Image>

                            <div className={styles['signed-in-actions']}>
                                <Link href='/account'>Manage Account</Link>
                                <Link href='/api/auth/logout'>Logout</Link>
                            </div>


                        </div>
                        :
                        <>
                            <Link className={`${styles['join-link']} ${styles['acc-btn']}`} href='/api/auth/login' >
                                Join
                            </Link>
                            <Link className={`${styles['sign-in-link']} ${styles['acc-btn']}`} href='/api/auth/login'>
                                Sign in
                            </Link>
                        </>
                }

            </div>
        </header>
    )
};

export default Header;
