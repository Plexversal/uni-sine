// components/UserAccountModal.js
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Modal from 'react-modal';
import styles from '../../styles/UserAccountModal.module.css';
import { GrUserSettings, GrFormClose, GrLogout } from 'react-icons/gr';
import Router from 'next/router';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
Modal.setAppElement('#__next');

const AccountModal = forwardRef((props, ref) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const { user, isLoading, error } = useUser()
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [userData, setUser] = useState()
  const router = useRouter();

  const closeModal = () => {
    setIsOpened(false);
    setTimeout(() => {
      setModalIsOpen(false);
    }, 300);
  };
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleButtonClick = async () => {
    if (!user && !isLoading) {
      const currentUrl = window.location.pathname;
      const returnTo = encodeURIComponent(currentUrl);
      router.push(`/api/auth/login?returnTo=${returnTo}`);
    } else {
      try {
        const response = await fetch(`/api/auth0/auth0-user`);
        const data = await response.json();
        if (!data) {
          throw new Error('Error loading user data');
        }
        setUser(data);
        setLoadingProfile(false);
        setModalIsOpen(true);

      } catch (error) {
        throw error
      }
    }
  };

  

  useImperativeHandle(ref, () => ({
    handleButtonClick,
  }));
  const handleAfterOpen = () => {
    setIsOpened(true);
  };

  const handleManageSubscriptionClick = async () => {
    // The user's Stripe Customer ID should be stored somewhere in your application state
    const response = await fetch('/api/payment/create-manage-sub-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stripeCustomerId: userData?.app_metadata?.stripe_customer_id,
      }),
    });
    const { url } = await response.json();
    window.location.assign(url);
  }

  if (userData) {

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

    const startCheckout = async () => {
      const res = await fetch('/api/payment/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          stripeCustomerId: userData?.app_metadata?.stripe_customer_id,
        }),
      });
  
      const { sessionId } = await res.json();
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    };

    return (
      <>

        <div className={styles['manage-account-container']}>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={handleAfterOpen}
            onRequestClose={closeModal}
            contentLabel="User Account Modal"
            className={`${styles.Modal} ${styles['modal-initial']} ${isOpened ? styles['modal-open'] : ''
              }`}
            overlayClassName={`${styles.Overlay} ${styles['overlay-initial']} ${isOpened ? styles['overlay-open'] : ''
              }`}
            onClick={handleClickOutside}
          >
            <div className={styles['modal-header']}>
              <h2>Account Details</h2>
              <button className={styles['close-button']} onClick={closeModal}>
                <GrFormClose />
              </button>
            </div>
            {
              loadingProfile ? <div>Loading</div> : <div>

                <ul className={styles['account-list']}>
                  <li>
                    <div><strong>Email</strong></div>
                    <div>{userData.email}</div>

                  </li>
                  <li>
                    <div><strong>Sign in method</strong></div>
                    <div>{userData.identities[0].provider}</div>
                  </li>
                  <li>
                    <div><strong>Password</strong></div>
                    {userData.identities[0].isSocial ? <div>Change your password on your social account</div> : <a className={`${styles['account-btn']} ${styles['change-password-btn']}`} onClick={changePassword}>Change Password</a>}
                  </li>

                  {
                    userData?.app_metadata?.is_premium ?
                      <li>
                        <div><strong>Subscription</strong></div>
                        <div><a className={styles['subscription-link']} onClick={handleManageSubscriptionClick}>Manage Subscription</a></div>
                      </li>
                      :
                      <li >
                        <div><strong>Subscription</strong></div>
                        <div ><button className={styles['subscription-link']} onClick={startCheckout}>Buy Premium</button></div>
                      </li>
                  }
                  <Link legacyBehavior href={`/api/auth/logout`}><a className={styles.logout}>Logout</a></Link>
                </ul>
              </div>
            }
          </Modal>
        </div>
      </>
    )
  } else if (!userData) {
    return <></>
  }
});

AccountModal.displayName = 'AccountModal'
export default AccountModal;