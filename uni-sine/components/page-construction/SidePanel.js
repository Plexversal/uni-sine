import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/SidePanel.module.css'
import Link from "next/link";
import { BsChevronDoubleLeft, BsChevronDoubleRight,  } from 'react-icons/bs'
import { BiChevronRight, BiCalculator, BiHome, BiMath, BiAtom, BiCodeBlock, BiSupport, BiFontFamily, BiSlider, BiBook } from 'react-icons/bi'
import { GrUserSettings } from 'react-icons/gr'
import FastRead from './FastRead';
import AccountModal from "./AccountModal";

const SidePanel = ({ user }) => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        window.innerWidth < 600 ? setIsOpen(false) : null
    }, [])

    const toggleSidePanel = () => {
        setIsOpen(!isOpen);

    };

    const userAccountModalRef = useRef();

    const handleUserAccountButtonClick = () => {
      userAccountModalRef.current.handleButtonClick();
    };
  
    return (
        <div className={`${styles['side-panel']} ${isOpen ? styles.open : styles.closed}`}>
            <button onClick={toggleSidePanel} className={styles['toggle-panel']}>
                {isOpen ? <BsChevronDoubleLeft /> : <BsChevronDoubleRight />}
            </button>
            <div className={`${styles['side-panel-content']} ${isOpen ? styles['show-content'] : styles['hide-content']}`}>
                <div className={`${styles['topics']} ${styles['side-panel-content-container']}`}>
                    <ul>
                        <li>
                            <Link legacyBehavior href="/">
                                <a>
                                    <div>
                                        <span><BiHome /></span>Home
                                    </div>
                                    <BiChevronRight />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/mathematics">
                                <a>
                                    <div>
                                        <span><BiMath /></span>Mathematics
                                    </div>
                                    <BiChevronRight />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/physics">
                                <a>
                                    <div>
                                        <span><BiAtom /></span>Physics
                                    </div>
                                    <BiChevronRight />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/computer-science">
                                <a>
                                    <div>
                                        <span><BiCodeBlock /></span>Computer Science
                                    </div>
                                    <BiChevronRight />
                                </a>
                            </Link>
                        </li>
                    </ul>
                    <ul className={styles['premium-list']}>
                        <li>
                            <Link legacyBehavior href="/questions">
                                <a onClick={() => window.innerWidth < 600 ? setIsOpen(false) : null}>
                                    <div>
                                        <span><BiFontFamily /></span>Practice questions
                                    </div>
                                    <BiChevronRight />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/calculators">
                                <a onClick={() => window.innerWidth < 600 ? setIsOpen(false) : null}>
                                    <div>
                                        <span><BiCalculator /></span>Calculators
                                    </div>
                                    <BiChevronRight />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/courses">
                                <a onClick={() => window.innerWidth < 600 ? setIsOpen(false) : null}>
                                    <div>
                                        <span><BiBook /></span>Courses
                                    </div>
                                    <BiChevronRight />
                                </a>
                            </Link>
                        </li>
                    </ul>

                </div>
                <div className={`${styles['account']} ${styles['side-panel-content-container']}`}>
                    <ul>
                        <li>
                            <a onClick={handleUserAccountButtonClick}>
                                <div>
                                    <span>
                                        <GrUserSettings />
                                    </span>
                                    Account
                                </div>
                            </a>
                            <AccountModal ref={userAccountModalRef} user={user} />
                        </li>
                        <li>
                            <FastRead />
                        </li>
                        <li>
                            <Link legacyBehavior href="/contact">
                                <a>
                                    <div>
                                        <span><BiSupport /></span>Support
                                    </div>
                                    <BiChevronRight />
                                </a>
                            </Link>
                        </li>
                        {
                            user?.app_metadata?.is_admin ? (
                                <li>
                                <Link legacyBehavior href="/admin">
                                    <a onClick={() => window.innerWidth < 600 ? setIsOpen(false) : null}>
                                        <div>
                                            <span><BiSlider /></span>Admin
                                        </div>
                                        <BiChevronRight />
                                    </a>
                                </Link>
                            </li>) : null
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SidePanel;
