import { forwardRef, useState, useImperativeHandle } from 'react';
import Modal from 'react-modal';
import styles from '../../styles/UserAccountModal.module.css'; // Reusing your styles
import { GrFormClose } from 'react-icons/gr';
import startCheckout from './StartCheckout';
import Link from 'next/link';
import { BsStars } from "react-icons/bs";

Modal.setAppElement('#__next');

const BuyPremiumModal = forwardRef((props, ref) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

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

  useImperativeHandle(ref, () => ({
    openModal: () => setModalIsOpen(true)
  }));

  const handleAfterOpen = () => {
    setIsOpened(true);
  };


  return (
    <>
      <div className={styles['manage-account-container']}>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={handleAfterOpen}
          onRequestClose={closeModal}
          contentLabel="Buy Premium Modal"
          className={ props.showOverlay ? `${styles.Modal} ${styles['modal-initial']} ${isOpened ? styles['modal-open'] : ''
            }` : null}
          overlayClassName={`${styles.Overlay} ${styles['overlay-initial']} ${isOpened ? styles['overlay-open'] : ''
            }`}
          onClick={handleClickOutside}
        >
          <div className={styles['modal-header']}>
            <h2>Buy Premium</h2>
            <button className={styles['close-button']} onClick={closeModal}>
              <GrFormClose />
            </button>
          </div>
          <div>
            <p>Upgrade to premium to unlock all features!</p>
            <ul className={styles['feature-list']}>
              <li>Premium calculators and tools</li>
              <li>Daily exam style Questions</li>
              <li>Access to all Courses</li>
              <li>Access to AI chat</li>

            </ul>
            {
            !props.user && <Link href='/api/auth/login' onClick={() => startCheckout(props.user)} className={styles['buy-premium-btn']}>Login/sign up</Link>

            }
            {
              props.user && <button className={styles['subscription-link']} onClick={() => startCheckout(props.user)}><BsStars />Subscribe</button>
            }

          </div>
        </Modal>
      </div>
    </>
  );
});

BuyPremiumModal.displayName = 'BuyPremiumModal';
export default BuyPremiumModal;
