import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { useAnimation } from 'framer-motion'
export default function Home() {

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
  console.log(inViewS3)

    if (inViewS2) {
      animation.start({
        y: 0,
        opacity: 1,
        transition: {
          delay: .6,
          type: 'spring',
          damping: '20',
          stiffness: '100'
        },
      })
      animation2.start({
        y: 0,
        opacity: 1,
        transition: {
          delay: .7,
          type: 'spring',
          damping: '20',
          stiffness: '100'
        },
      })
      animation3.start({
        y: 0,
        opacity: 1,
        transition: {
          delay: 8,
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
    location.href='#section-3';
  }
  return (
    <>
      <div className={styles.container}>
        <section className={styles['section-one']}>
          <div className={styles['section-one-top']}>
            <motion.h1 initial='hidden' animate='visible' variants={{
              hidden: {
                opacity: 0,
                y: `0.25em`,
              },
              visible: {
                opacity: 1,
                y: `0em`,
                transition: {
                  duration: .8,

                },
              },
            }}>
              Uni-Sine
            </motion.h1>
          </div>
          <div className={styles['section-one-content']}>
            <motion.h2 className={styles['main-text-2']} initial='hidden' animate='visible' variants={{
              hidden: {
                opacity: 0,
                y: `0.25em`,
              },
              visible: {
                opacity: 1,
                y: `0em`,
                transition: {
                  duration: .8,

                },
              },
            }}><span className={styles['main-text-2-sub']} >All the knowledge you need in one place</span><br></br>Learn at your own pace with a variety of interactive ways to help you learn faster.</motion.h2>

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
          <motion.button  transition={{repeat: Infinity, repeatDelay: 1}} animate={{ scale: [1, 1.2, 1.2, 1, 1]}} onClick={scrollClick} className={styles['learn-more-btn']}>Learn more</motion.button>
        </section>
        <section id='section-3' className={styles['section-three']}>
          <div className={styles['section-three-content-1']}>
            <div ref={ref2} className={styles['section-three-content-sub']}>
              <motion.div animate={animation6}>
                <h1>Unique practice questions</h1>
                <h2>Generate unlimited practice questions using specially engineered tools to help you get comfortable with the topic.</h2>
              </motion.div>
              <motion.img animate={animation7} src='/static/home/unique-questions.gif'></motion.img>
            </div>
            <div ref={ref3} className={styles['section-three-content-sub']}>
              <motion.img animate={animation8} className={styles['section-three-content-sub-img']} src='/static/home/interactive-comps.gif'></motion.img>
              <motion.div animate={animation9}>
                <h1>Interactive components</h1>
                <h2>Use our wide range of interactive tools and calculators to form a new perspective to help you learn faster.</h2>
              </motion.div>
            </div>
            <div ref={ref4} className={styles['section-three-content-sub']}>
              <motion.div animate={animation10}>
                <h1>In-depth math</h1>
                <h2>Most topics heavily rely on math, so take advantage of the in-depth mathematical equations for a deeper understanding.</h2>
              </motion.div>
              <motion.img animate={animation11} src='/static/home/in-depth-math.png'></motion.img >
            </div>
          </div>


        </section>
        <section  ref={ref} className={styles['section-two']}>
          <motion.div animate={animation5} className={styles['section-two-container']}>
          <h1>Choose a field</h1>
          <div className={styles['selections']}>

            <motion.div  animate={animation}
              className={styles['category-section']}>
              <div className={`${styles['physics-banner']} ${styles.banner}`}>
                <div className={styles['banner-content-container']}>
                  <img className={styles['img-category']} src='/static/home/physics_home.svg'></img>


                  <h1>Physics</h1>
                  <p>Find various topics across all areas of physics and learn the nature of how our entire universe works.</p>
                  <Link href='/physics'><button className={styles['field-btn']}>Jump in!</button></Link>
                </div>
              </div>

            </motion.div>

            <motion.div  animate={animation2} className={styles['category-section']}>
              <div className={`${styles['maths-banner']} ${styles.banner}`}>

                <div className={styles['banner-content-container']}>
                  <img className={styles['img-category']} src='/static/home/maths_home.svg'></img>
                  <h1>Mathematics</h1>
                  <p>Learn the fundamentals in the natural language of the universe itself and discover great mathematical ability.</p>
                  <Link href='/mathematics'><button className={styles['field-btn']}>Jump in!</button></Link>
                </div>
              </div>

            </motion.div>

            <motion.div animate={animation2} className={styles['category-section']}>
              <div className={`${styles['comp-banner']} ${styles.banner}`}>
                <div className={styles['banner-content-container']}>
                  <img className={styles['img-category']} src='/static/home/comp_sci_home.svg'></img>

                  <h1>Computer Science</h1>
                  <p>Discover the true power of technology and learn various coding techniques, IT skills and applied math.</p>
                  <Link href='/computer-science'><button className={styles['field-btn']}>Jump in!</button></Link>

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
