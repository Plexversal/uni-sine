// components/UserAccountModal.js
import { useRouter } from 'next/router';
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import Modal from 'react-modal';
import styles from '../../styles/UserAccountModal.module.css';
import { GrFormClose  } from 'react-icons/gr';
import Router from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { sendGTMEvent } from '@next/third-parties/google'
import startCheckout from './StartCheckout';
import { BsStars } from "react-icons/bs";
import { useUserContext } from '../../contexts/UserContext';

Modal.setAppElement('#__next');

const AccountModal = forwardRef((props, ref) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true)
  const router = useRouter();
  const { user, isLoading, fetchUser } = useUserContext();

  useEffect(() => {
    if(isOpened) {
      fetchUser()
    }
  }, [isOpened])
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
    if (!user) {
      const returnLink = `/api/auth/login?returnTo=${encodeURIComponent(router.pathname)}`;
      router.push(returnLink);
    } else {
      try {
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
    const response = await fetch('/api/payment/create-manage-sub-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stripeCustomerId: user?.app_metadata?.stripe_customer_id,
      }),
    });
    const { url } = await response.json();
    window.location.assign(url);
  }

  if (user) {
    

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
                    <div>{user.email}</div>

                  </li>
                  <li>
                    <div><strong>Sign in method</strong></div>
                    <div>{user.identities[0].provider}</div>
                  </li>
                  <li>
                    <div><strong>Password</strong></div>
                    {user.identities[0].isSocial ? <div>Change your password on your social account</div> : <a className={`${styles['account-btn']} ${styles['change-password-btn']}`} onClick={changePassword}>Change Password</a>}
                  </li>

                  {
                    user?.app_metadata?.is_premium ?
                      <li>
                        <div><strong>Subscription</strong></div>
                        <div><button className={styles['subscription-link']} onClick={handleManageSubscriptionClick}>Manage Subscription</button></div>
                      </li>
                      :
                      <li >
                        <div><strong>Subscription</strong></div>
                        <div className={styles['buy-premium-btn']} ><button className={styles['subscription-link']} onClick={() => startCheckout(user)}><BsStars />Subscribe</button></div>
                      </li>
                  }
                  <a href={`/api/auth/logout`} className={styles.logout}>Logout</a>
                </ul>
              </div>
            }
          </Modal>
        </div>
      </>
    )
  } else if (!user) {
    return <></>
  }
});

AccountModal.displayName = 'AccountModal'
export default AccountModal;