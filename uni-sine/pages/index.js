import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { useAnimation } from 'framer-motion'

import Script from 'next/script'
import PricingPage  from '../components/page-construction/Payment'
import Header from '../components/page-construction/Header'
import startCheckout from '../components/page-construction/StartCheckout'
import LoadingIcon from '../components/page-construction/LoadingIcon'
export const getServerSideProps = ({ query }) => ({
  props: query
});

export default function Home(props) {
  const [userData, setUser] = useState();
  const [isAuth0Loading, setIsAuth0Loading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsAuth0Loading(true);
      try {
        const response = await fetch(`/api/auth0/auth0-user`);
        const data = await response.json();
        if (!data) {
          throw new Error("Error loading user data");
        }
        setUser(data);

        setIsAuth0Loading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const [ref, inViewS2] = useInView({
    triggerOnce: true,
    threshold: .1
  })

  const animation = useAnimation()
  const animation2 = useAnimation()
  const animation3 = useAnimation()
  const animation5 = useAnimation()


  useEffect(() => {

    if (inViewS2) {
      animation.start({
        y: 0,
        opacity: 1,
        transition: {
          delay: .2,
          type: 'spring',
          damping: '20',
          stiffness: '100'
        },
      })
      animation2.start({
        y: 0,
        opacity: 1,
        transition: {
          delay: .3,
          type: 'spring',
          damping: '20',
          stiffness: '100'
        },
      })
      animation3.start({
        y: 0,
        opacity: 1,
        transition: {
          delay: .4,
          type: 'spring',
          damping: '20',
          stiffness: '100'
        },

      })
    }

    if (!inViewS2) {
      animation.start({
        opacity: 0,
        y: -60
      })
      animation2.start({
        opacity: 0,
        y: -60
      })
      animation3.start({
        opacity: 0,
        y: -60
      })
    }
  }, [inViewS2])

  function scrollClick() {
    document.getElementById('field-select-section').scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    })
  }

  return (
    <>
        <Script src='https://js.stripe.com/v3/pricing-table.js' async={true} defer />

      <div className={styles.container}>
        <Header />
        <section className={styles['landing-section']}>

          <div className={styles['landing-section-content']}>
            <div className={styles['landing-left']}>
              <h1>All the knowledge you need in one place</h1>
              <p>Uni-Sine Learning is an online learning platform designed to help you learn through visual and interactive tools.</p>
              <p>Need to pass your exams? Or perhaps just curious about the world. This is the place to learn. </p>
              <motion.button onClick={scrollClick} transition={{ repeat: Infinity, repeatDelay: 1 }} animate={{ scale: [1, 1.1, 1.2, 1, 1] }} className={styles['explore-btn']}>Explore Topics</motion.button>
            </div>

            <div className={styles['image-container']}>
              <motion.img src="/static/home/mac-final.png" className={styles['home-img-3']} initial='hidden' animate='visible' variants={
                {
                  hidden: {
                    y: '-100vh',
                    opacity: 0
                  },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: .1,
                      type: 'spring',
                      damping: '20',
                      stiffness: '80'
                    },
                    y: '0'
                  },

                }
              }>

              </motion.img>

              <motion.img src="/static/home/ipad-final.png" className={styles['home-img-2']} initial='hidden' animate='visible' variants={
                {
                  hidden: {
                    y: '-100vh',
                    opacity: 0
                  },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: .2,
                      type: 'spring',
                      damping: '20',
                      stiffness: '80'
                    },
                    y: '0'
                  },

                }
              }>

              </motion.img>

              <motion.img src="/static/home/iphone-final.png" className={styles['home-img-1']} initial='hidden' animate='visible' variants={
                {
                  hidden: {
                    y: '-100vh',
                    opacity: 0
                  },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: .4,
                      type: 'spring',
                      damping: '20',
                      stiffness: '80'
                    },
                    y: '0'
                  },

                }
              }>
              </motion.img>
            </div>
          </div>
        </section>

        <section className={styles['info-bubbles-section']}>
          <div className={styles['info-bubble']}>
            <div>
              <h1>Unique Practice questions</h1>
              <ul>
                <li>Generate unlimited, unique practice questions</li>
                <li>Tools designed with hard coded math for accurate results</li>
              </ul>
            </div>
            <img src='/static/home/unique-questions.gif' />

          </div>
          <div className={styles['info-bubble']}>
            <img src='/static/home/interactive-comps.gif' />
            <div>
              <h1>14+ Interactive calculators</h1>
              <p>Go beyond a standard calculator with a variety of visual graphing and algebra calculators specially designed for helping you learn faster</p>
            </div>

          </div>
          <div className={styles['info-bubble']}>
            <div>
              <h1>High level math explained for any skill level</h1>
              <p>We know not everyone can pick up math easily, that&apos;s why we make every effort to show and derive every step.</p>
            </div>
            <img className={styles['info-bubble-img-no-style']} src='/static/home/home-img-3.png' />
          </div>
          <div className={styles['info-bubble']}>
            <img className={styles['info-bubble-img-no-style']} src='/static/home/home-img-4.png' />
            <div>
              <h1>Built for A-levels and ACT&apos;s</h1>
              <ul>
                <li>Improve your chances of scoring higher in A-levels, ACT&apos;s or SAT&apos;s</li>
                <li>Information has been specially sourced around the grading exam boards of these tests such as AQA and OCR</li>
              </ul>
            </div>
          </div>

        </section>
        <section id='prices' className={styles['price-section']}>
          {/* <PricingPage /> */}
          <h1>Choose a plan</h1>
          <div className={styles['plan-options-container']}>

            <div>
              <div>
                <p>Billed Monthly</p>
                <h2>{props.country == 'GB' ? `£` : `$`}10 / month</h2>
                <ul className={styles['feature-list']}>
                  <li>Full access to all current and future interactive components and calculators</li>
                  <li>Access to all premium and university level pages</li>
                  <li>Email support</li>
                </ul>
              </div>
              {
                isAuth0Loading ? <LoadingIcon /> : <>{
                  userData?.app_metadata?.is_premium ? <div>You are already subscribed!</div> : 
                  <button onClick={startCheckout}>Buy Subscription</button> 
                }</>
              }
            </div>
            <div>
              <div>
                <p>Education</p>
                <h2>{props.country == 'GB' ? `£` : `$`} Custom</h2>
                <p>For education institutions looking to get access for multiple students.</p>
                <p>We are want everyone to have the best access to education and are happy to work with schools and colleges to give all students a valid subscription at a discounted price.</p>
              </div>
              <a href={'/contact'}>Contact</a>
            </div>
          </div>
        </section>
        <section ref={ref} id='field-select-section' className={styles['field-select-section']}>
          <motion.div animate={animation5} className={styles['field-select-section-container']}>
            <h1>Choose a field</h1>
            <div className={styles['selections']}>

              <motion.div animate={animation}
                className={styles['category-section']}>
                <div className={`${styles['physics-banner']} ${styles.banner}`}>
                  <div className={styles['banner-content-container']}>
                    <img alt='' className={styles['img-category']} src='/static/home/physics_home.svg'></img>


                    <h1>Physics</h1>
                    <p>Find various topics across all areas of physics and learn the nature of how our entire universe works.</p>
                    <Link href='/physics'><button className={styles['field-btn']}>Jump in!</button></Link>
                  </div>
                </div>

              </motion.div>

              <motion.div animate={animation2} className={styles['category-section']}>
                <div className={`${styles['maths-banner']} ${styles.banner}`}>

                  <div className={styles['banner-content-container']}>
                    <img alt='' className={styles['img-category']} src='/static/home/maths_home.svg'></img>
                    <h1>Mathematics</h1>
                    <p>Learn the fundamentals in the natural language of the universe itself and discover great mathematical ability.</p>
                    <Link href='/mathematics'><button className={styles['field-btn']}>Jump in!</button></Link>
                  </div>
                </div>

              </motion.div>

              <motion.div animate={animation3} className={styles['category-section']}>
                <div className={`${styles['comp-banner']} ${styles.banner}`}>
                  <div className={styles['banner-content-container']}>
                    <img alt='' className={styles['img-category']} src='/static/home/comp_sci_home.svg'></img>

                    <h1>Computer Science</h1>
                    <p>Discover the true power of technology and learn various coding techniques, IT skills and applied math.</p>
                    <Link passHref href='/computer-science'><button className={styles['field-btn']}>Jump in!</button></Link>

                    {/* <Link href='/computer-science'><button className={styles['field-btn']}>Jump in!</button></Link> */}

                  </div>
                </div>

              </motion.div>
            </div>
          </motion.div>
        </section>

      </div>


    </>
  )
}
