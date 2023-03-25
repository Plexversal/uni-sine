// components/UserAccountModal.js
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from '../../styles/UserAccountModal.module.css';
import { GrUserSettings, GrFormClose } from 'react-icons/gr';
import Router from 'next/router';

Modal.setAppElement('#__next');

export default function UserAccountModal() {
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

  const handleAfterOpen = () => {
    setIsOpened(true);
  };



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

    return (
      <>
        <a onClick={handleButtonClick}>
          <div>
            <span>
              <GrUserSettings />
            </span>
            Account
          </div>
        </a>
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
            <button className={styles['close-button']} onClick={closeModal}>
              <GrFormClose />
            </button>
            {
              loadingProfile ? <div>Loading</div> : <div>
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
                    {userData.identities[0].isSocial ? <p>Change your password on your social account</p> : <a className={`${styles['account-btn']} ${styles['change-password-btn']}`} onClick={changePassword}>Change Password</a>}
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
            }
          </Modal>
        </div>
      </>
    )
  } else if (!userData) {
    return (<a onClick={handleButtonClick}>
      <div>
        <span>
          <GrUserSettings />
        </span>
        Account
      </div>
    </a>)
  }
}
