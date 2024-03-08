// components/UserAccountModal.js
import { useRouter } from 'next/router';
import { useState, forwardRef, useImperativeHandle } from 'react';
import Modal from 'react-modal';
import styles from '../../styles/UserAccountModal.module.css';
import { GrFormClose  } from 'react-icons/gr';
import Router from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { sendGTMEvent } from '@next/third-parties/google'

Modal.setAppElement('#__next');

const AccountModal = forwardRef((props, ref) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  //const { user, isLoading, error } = useUser()
  const [loadingProfile, setLoadingProfile] = useState(true)
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
    if (!props.user) {
      const currentUrl = window.location.pathname;
      const returnTo = encodeURIComponent(currentUrl);
      router.push(`/api/auth/login?returnTo=${returnTo}`);
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
        stripeCustomerId: props.user?.app_metadata?.stripe_customer_id,
      }),
    });
    const { url } = await response.json();
    window.location.assign(url);
  }

  if (props.user) {
    

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
      sendGTMEvent({event: 'start_checkout',
      contents: {
        content_type: "subscription",
        content_name: "premium",
        content_id: 1,
        currency: ((props.user?.app_metadata.region === 'NA' || props.user?.app_metadata.region === 'SA') ? 'USD' : 'GBP'),
        email: props.user.email,
        external_id: props.user.user_id,
        value: ((props.user?.app_metadata.region === 'NA' || props.user?.app_metadata.region === 'SA') ? 15 : 10)
        
      }


  })
      const res = await fetch('/api/payment/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          stripeCustomerId: props.user?.app_metadata?.stripe_customer_id,
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
                    <div>{props.user.email}</div>

                  </li>
                  <li>
                    <div><strong>Sign in method</strong></div>
                    <div>{props.user.identities[0].provider}</div>
                  </li>
                  <li>
                    <div><strong>Password</strong></div>
                    {props.user.identities[0].isSocial ? <div>Change your password on your social account</div> : <a className={`${styles['account-btn']} ${styles['change-password-btn']}`} onClick={changePassword}>Change Password</a>}
                  </li>

                  {
                    props.user?.app_metadata?.is_premium ?
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
                  <a href={`/api/auth/logout`} className={styles.logout}>Logout</a>
                </ul>
              </div>
            }
          </Modal>
        </div>
      </>
    )
  } else if (!props.user) {
    return <></>
  }
});

AccountModal.displayName = 'AccountModal'
export default AccountModal;