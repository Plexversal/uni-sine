import React, { useRef } from "react"
import { useUser } from '@auth0/nextjs-auth0/client';
import styles from '../../styles/Home.module.css'
import Link from "next/link";
import Image from 'next/image'
import AccountModal from "./AccountModal";
import OfferBanner from "./OfferBanner";
import { useUserContext } from '../../contexts/UserContext';
const Header = () => {
    const userAccountModalRef = useRef();
    const { user, isLoading } = useUserContext();

    const handleUserAccountButtonClick = () => {
      userAccountModalRef.current.handleButtonClick();
    };
    return (
        <header className={styles['header']}>
        <OfferBanner user={user} isLoading={isLoading}/>


            <div className={styles['header-content']}>
            <div className={styles['logo']}>
                <h1>Uni-Sine</h1>
                <p>Learning</p>
            </div>
            <div className={styles['account-actions']}>
                {
                    user ?
                        <div className={styles['signed-in-info']}>

                            <div className={styles['signed-in-actions']}>
                                <a onClick={handleUserAccountButtonClick}>Manage Account</a>
                                <AccountModal ref={userAccountModalRef} user={user} />
                                <a href={`/api/auth/logout`} className={styles.logout}>Logout</a>
                            </div>
                            <Image height={50} width={50} src={user.picture}></Image>


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
            </div>

        </header>
    )
};

export default Header;
