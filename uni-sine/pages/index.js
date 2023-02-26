import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { useAnimation } from 'framer-motion'
export const getServerSideProps = ({ query }) => ({
  props: query
});

export default function Home(props) {
  console.log(props.country)
  const [ ref, inViewS2 ] = useInView({
    triggerOnce: true,
    threshold: .1
  })

  const [ ref2, inViewS3 ] = useInView({
    triggerOnce: true,
    threshold: .1
  })
  const [ ref3, inViewS4 ] = useInView({
    triggerOnce: true,
    threshold: .1
  })

  const [ ref4, inViewS5 ] = useInView({
    triggerOnce: true,
    threshold: .1
  })

  
  const animation = useAnimation()
  const animation2 = useAnimation()
  const animation3 = useAnimation()
  const animation4 = useAnimation()
  const animation5 = useAnimation()
  const animation6 = useAnimation()
  const animation7 = useAnimation()
  const animation8 = useAnimation()
  const animation9 = useAnimation()
  const animation10 = useAnimation()
  const animation11 = useAnimation()

  useEffect(() => {
    if(inViewS3) {
      animation10.start({
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          damping: '20',
          stiffness: '80'
        },
        x: '0'
      })
      animation11.start({
        scale: 1,
        opacity: 1,
        transition: {

          type: 'spring',
          damping: '20',
          stiffness: '80'
        },
        x: '0'
      })
    }
    if(!inViewS3){
      animation10.start({
        x: '-100vw',
        opacity: 0,

      })
      animation11.start({
        x: '+100vw',
        opacity: 0,


      })
    }
  }, [inViewS5])

  useEffect(() => {
    if(inViewS3) {
      animation8.start({
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          damping: '20',
          stiffness: '80'
        },
        x: '0'
      })
      animation9.start({
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          damping: '20',
          stiffness: '80'
        },
        x: '0'
      })
    }
    if(!inViewS3){
      animation8.start({
        x: '-100vw',
        opacity: 0,

      })
      animation9.start({
        x: '+100vw',
        opacity: 0,


      })
    }
  }, [inViewS4])

  useEffect(() => {
    if(inViewS3) {
      animation6.start({
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          damping: '20',
          stiffness: '80'
        },
        x: '0'
      })
      animation7.start({
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          damping: '20',
          stiffness: '80'
        },
        x: '0'
      })
    }
    if(!inViewS3){
      animation6.start({
        x: '-100vw',
        opacity: 0,

      })
      animation7.start({
        x: '+100vw',
        opacity: 0,


      })
    }
  }, [inViewS3])

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
      animation4.start({
          scale: '10'
      })
      // animation5.start({
      //   clipPath: 'circle(150% at 0% 50%)',
      //   transition: {
      //     duration: 1,

      //   }
      // })
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
      animation4.start({
        scale: '0'
    })
    // animation5.start({
    //   clipPath: 'circle(10% at 0% 50%)'
    // })
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
      <div className={styles.container}>
      <header className={styles['header']}>
            <div className={styles['logo']}>
              <h1>Uni-Sine</h1>
              <p>Learning</p>
            </div>
            <div className={styles['account-actions']}>
              <a className={styles['join-link']}>Join</a>
              <a className={styles['sign-in-link']}>Sign in</a>
            </div>
          </header>
        <section className={styles['landing-section']}>

          <div className={styles['landing-section-content']}>
            <div className={styles['landing-left']}>
              <h1>All the knowledge you need in one place</h1>
              <p>Uni-Sine Learning is an online learning platform designed to help you learn through visual and interactive tools.</p>
              <p>Need to pass your exams? Or perhaps just curious about the world. This is the place to learn. </p>
              <motion.button onClick={scrollClick} transition={{repeat: Infinity, repeatDelay: 1}} animate={{ scale: [1, 1.1, 1.2, 1, 1]}} className={styles['explore-btn']}>Explore Topics</motion.button>
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
            {/* <Image></Image> */}
          </div>
          <div className={styles['info-bubble']}>
            {/* <Image></Image> */}
            <div>
              <h1>30+ Different visual calculators</h1>
              <p>Go beyond a standard calculator with a variety of visual graphing and algebra calculators specially designed for helping you learn faster</p>
            </div>

          </div>
          <div className={styles['info-bubble']}>
            <div>
            <h1>High level math explained for any skill level</h1>
              <p>We know not everyone can pick up math easily, that&apos;s why we make every effort to show and derive every step.</p>
            </div>
            {/* <Image></Image> */}
          </div>
          <div className={styles['info-bubble']}>
            {/* <Image></Image> */}
            <div>
              <h1>Built for A-levels and ACT&apos;s</h1>
              <ul>
                <li>Improve your chances of scoring higher in A-levels, ACT&apos;s or SAT&apos;s</li>
                <li>Information has been sourced specially around the grading exam boards of these tests such as AQA and OCR</li>
              </ul>
            </div>
          </div>

        </section>
        <section className={styles['price-section']}>
          <h1>Choose a plan</h1>
          <div className={styles['plan-options-container']}>
              <div>
                <div>
                  <p>Billed Monthly</p>
                  <h2>$10 / month</h2>
                  <ul className={styles['feature-list']}>
                    <li>Full access to all interactive components and calculators</li>
                    <li>Access to all premium and university level pages</li>
                    <li>Email support</li>
                  </ul>
                </div>
                <a>Sign up</a>
              </div>
              <div>
                <div>
                <p>Billed Yearly</p>
                <h2>$8 / month</h2>
                <ul className={styles['feature-list']}>
                  <li>Full access to all interactive components and calculators</li>
                  <li>Access to all premium and university level pages</li>
                  <li>Email support</li>
                </ul>
                </div>
                <a>Sign up</a>
              </div>
              <div>
                <div>
                  <p>Education</p>
                  <h2>$ Custom</h2>
                  <p>For education institutions looking to get access for multiple students.</p>
                  <p>We are want everyone to have the best access to education and are happy to work with schools and colleges</p>
                </div>
                <a>Contact</a>
              </div>
          </div>
        </section>
        <section ref={ref} id='field-select-section' className={styles['field-select-section']}>
          <motion.div animate={animation5} className={styles['field-select-section-container']}>
          <h1>Choose a field</h1>
          <div className={styles['selections']}>

            <motion.div  animate={animation}
              className={styles['category-section']}>
              <div className={`${styles['physics-banner']} ${styles.banner}`}>
                <div className={styles['banner-content-container']}>
                  <img alt=''className={styles['img-category']} src='/static/home/physics_home.svg'></img>


                  <h1>Physics</h1>
                  <p>Find various topics across all areas of physics and learn the nature of how our entire universe works.</p>
                  <Link href='/physics'><button className={styles['field-btn']}>Jump in!</button></Link>
                </div>
              </div>

            </motion.div>

            <motion.div  animate={animation2} className={styles['category-section']}>
              <div className={`${styles['maths-banner']} ${styles.banner}`}>

                <div className={styles['banner-content-container']}>
                  <img alt=''className={styles['img-category']} src='/static/home/maths_home.svg'></img>
                  <h1>Mathematics</h1>
                  <p>Learn the fundamentals in the natural language of the universe itself and discover great mathematical ability.</p>
                  <Link href='/mathematics'><button className={styles['field-btn']}>Jump in!</button></Link>
                </div>
              </div>

            </motion.div>

            <motion.div animate={animation3} className={styles['category-section']}>
              <div className={`${styles['comp-banner']} ${styles.banner}`}>
                <div className={styles['banner-content-container']}>
                  <img alt=''className={styles['img-category']} src='/static/home/comp_sci_home.svg'></img>

                  <h1>Computer Science</h1>
                  <p>Discover the true power of technology and learn various coding techniques, IT skills and applied math.</p>
                  <p><strong>Coming soon!</strong></p>
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
