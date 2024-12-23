import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { useAnimation } from 'framer-motion'
import {BsFillCaretDownFill, BsFillCaretRightFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Script from 'next/script'
import Header from '../components/page-construction/Header'
import startCheckout from '../components/page-construction/StartCheckout'
import Head from 'next/head'
import CookieBanner from '../components/page-construction/CookieBanner'
import { BsStars } from "react-icons/bs";
import { useUserContext } from '../contexts/UserContext';


export default function Home() {

  const { user, isLoading } = useUserContext();

  const [faqQuestionsOpen, setFaqQuestionsOpen] = useState([
    false,
    false,
    false
  ])


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
    <CookieBanner />
      <Head>
          <meta
          name="description"
          content="Revise Physics, Maths and Computer science with the power of AI, Courses, Graphing Calculators and more."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Uni-Sine: AI, Graph Calculators, Math and Comp Sci Courses" />
        <meta name="twitter:site" content="@UniSineSocial"/>
        <meta name="twitter:description" content="Revise Physics, Maths and Computer science with the power of AI, Courses, Graphing Calculators and more." />
        <meta name="twitter:image" content="https://uni-sine.com/static/socials/800500_home.png" />

        <meta property="og:title" content="Uni-Sine: AI, Graph Calculators, Math and Comp Sci Courses" />
        <meta property="og:description" content="Revise Physics, Maths and Computer science with the power of AI, Courses, Graphing Calculators and more." />
        <meta property="og:image" content="https://uni-sine.com/static/socials/800500_home.png" />
      </Head>

        <Script src='https://js.stripe.com/v3/pricing-table.js' async={true} defer />

      <div className={styles.container}>
        <Header {...{user: user, isLoading: isLoading}} />
        <section className={styles['landing-section']}>

          <div className={styles['landing-section-content']}>
            <div className={styles['landing-left']}>
              <h1>All the knowledge you need in one place</h1>
              <p>Uni-Sine Learning is an online learning platform designed to help you learn through <strong>visual and interactive tools</strong>, Advanced <strong>AI inegration</strong> and <strong>specialized courses</strong>.</p>
              <p>Need to pass your exams? Or perhaps just curious about the world. This is the place to learn. </p>
              <div className={styles['home-btn-wrapper']}>
              <button onClick={scrollClick} className={styles['explore-btn']}>Free Topics</button>
              <Link href={'/courses'} className={styles['calculators-btn']}>Explore Courses</Link>
              </div>
            </div>

            <div className={styles['mockup']}>
                <figure className={styles['project-img-container']}>
                    <figcaption className={styles['project-img-container-header']}>
                        <div className={styles['project-img-container-header-circles']}>
                            <span style={{backgroundColor: "#fc3261"}}></span>
                            <span style={{backgroundColor: "#ffb566"}}></span>
                            <span style={{backgroundColor: "#70ea5d"}}></span>
                        </div>
                        <div className={styles['project-img-container-header-arrows']}>
                            <span>{'<'}</span>
                            <span>{'>'}</span>

                        </div>
                        <div className={styles['project-img-container-header-search']}></div>
                        <div className={styles['project-img-container-header-hamburg']}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>


                    </figcaption>
                </figure>
                <div className={styles['project-img-container-img']}>
                    <Image  width={600 } height={400} src={'/static/home/uni-sine.png'} alt="uni-sine-home"/>
                </div>
            </div>
          </div>
        </section>

        <section className={styles['info-bubbles-section']}>
        <div className={styles['info-bubble']}>
        <img className={styles['info-bubble-img-no-style']} src='/static/home/home-img-4.png' />

            <div>
              <h1>Built for GCSE&apos;s, A-levels, ACT&apos;s, SAT&apos;s and AP&apos;s</h1>
              <ul>
                <li>Improve your chances of scoring higher in GCSE&apos;s, A-levels, ACT&apos;s, SAT&apos;s and AP&apos;s</li>
                <li>Information has been specially sourced around the grading exam boards of these tests such as AQA and OCR</li>
              </ul>
            </div>

          </div>
          <div className={styles['info-bubble']}>

            <div>
              <h1>Advanced AI Integration</h1>
              <p>Use the power of AI, built with <strong>GPT-4</strong>, to help advance your knowledge and reword content that is preferrable to your reading style.</p>

            </div>
            <video className={styles['video-preview']} playsInline autoPlay loop muted controls={false} preload="auto">
              <source src='/static/home/ai-preview.webm' type="video/webm" />
              <source src='/static/home/ai-preview.mp4' type="video/mp4" />
            </video>
          </div>

          <div className={styles['info-bubble']}>
          <video className={styles['video-preview']} playsInline autoPlay loop muted controls={false} preload="auto">
            <source src='/static/home/questions-preview.webm' type="video/webm" />
            <source src='/static/home/questions-preview.mp4' type="video/mp4" />

          </video>

            <div>
              <h1>Unique Practice questions</h1>
              <ul>
                <li>Practice with unique questions ranging from <strong>calculus</strong> in math or <strong>nuclear energy</strong> in physics!</li>
                <li>See answers in real time and get performance stats at the end. New questions refresh <strong>every day!</strong></li>
              </ul>
              <Link href={'/questions'} className={styles['link-page-btn']}> Questions</Link>
            </div>

          </div>
          <div className={styles['info-bubble']}>
            <div>
              <h1>15+ Interactive calculators</h1>
             <ul>
              <li>Go beyond a standard calculator with a variety of visual <strong>graphing</strong> and <strong>algebra</strong> calculators specially designed for helping you learn faster.</li>
              <li>Calculators in physics and math, for things like <strong>trigonometry</strong>, <strong>probability</strong>, <strong>potential energy</strong> and more!</li>
             </ul>
              <Link href={'/calculators'} className={styles['link-page-btn']}>Calculators</Link>

            </div>
            <video className={styles['video-preview']} playsInline autoPlay loop muted controls={false} preload="auto">
              <source src='/static/home/calculators-preview.webm' type="video/webm" />
              <source src='/static/home/calculators-preview.mp4' type="video/mp4" />

          </video>

          </div>
          <div className={styles['info-bubble']}>
          <video className={styles['video-preview']} playsInline autoPlay loop muted controls={false} preload="auto">
            <source src='/static/home/courses-preview.webm' type="video/webm" />
            <source src='/static/home/courses-preview.mp4' type="video/mp4" />

          </video>

            <div>
              <h1>Specialized Courses</h1>
              <ul>
                <li>A range of specific fun and interactive courses in subjects such as <strong>Black Holes</strong> or <strong>Web Development</strong>.</li>
                <li>Progress saves automatically and you can learn at your own pace!</li>
              </ul>
              <Link href={'/courses'} className={styles['link-page-btn']}> Courses</Link>
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
                {
                  user != null ? <h2>Only {(user?.app_metadata.region == 'NA' || user?.app_metadata.region == 'SA') ? '$15' : '£10'} / month!</h2> : <h2>Only £10 / month!</h2>
                }
                <ul className={styles['feature-list']}>
                  <li>Full access to all current and future interactive components and calculators</li>
                  <li>Access unique practice questions that refresh weekly</li>
                  <li>Access to AI chat built with OpenAI</li>
                  <li>Access to all courses current and future</li>
                </ul>
              </div>
              {
                
                  user != null ? user?.app_metadata?.is_premium ? <div>You are already subscribed!</div> : 
                  <button className={styles['subscription-link']} onClick={() => startCheckout(user)}><BsStars />Subscribe</button> :  <Link href={'/api/auth/login'}>Sign Up</Link>
                
              }
            </div>
            <div>
              <div>
                <p>Education</p>
                {
                  user != null ? <h2>{(user?.app_metadata?.region == 'NA' || user?.app_metadata?.region == 'SA') ? '$' : '£' } Custom</h2> : <h2>£ Custom</h2>
                }
                <p>For education institutions looking to get access for multiple students.</p>
                <p>We want everyone to have the best access to education and are happy to work with schools and colleges to give all students a valid subscription at a discounted price.</p>
              </div>
              <Link href={'/contact'}>Contact</Link>
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
        <section className={styles['FAQ-section']}>
      <h1>FAQ</h1>
      <div className={styles['FAQ-container']}>
        
        {/* Question 1 */}
        <div className={styles['FAQ-question']}>
          <h2 onClick={() => setFaqQuestionsOpen(prevState => [!prevState[0], prevState[1], prevState[2]])}>
            <span className={styles['arrow-select']}>{faqQuestionsOpen[0] ? <BsFillCaretDownFill /> : <BsFillCaretRightFill />}</span> 
            Who is Uni-Sine for?
          </h2>
          <div className={faqQuestionsOpen[0] ? `${styles['FAQ-content']} ${styles.open}` : styles['FAQ-content']}>
            <ul>
              <li>School, college and university students who want to learn more about a specific topic.</li>
              <li>Professionals who want to take advantage of our powerful tools.</li>
              <li>People who are simply curious about the universe we are apart of!</li>
            </ul>
          </div>
        </div>
        
        {/* Question 2 */}
        <div className={styles['FAQ-question']}>
          <h2 onClick={() => setFaqQuestionsOpen(prevState => [prevState[0], !prevState[1], prevState[2]])}>
            <span className={styles['arrow-select']}>{faqQuestionsOpen[1] ? <BsFillCaretDownFill /> : <BsFillCaretRightFill />}</span> 
            Does a subscription give me access to everything?
          </h2>
          <div className={faqQuestionsOpen[1] ? `${styles['FAQ-content']} ${styles.open}` : styles['FAQ-content']}>
            <p>Yes! There is currently only one subscription tier and it will give you access to everything we offer as well as future content, including tools, courses and practice questions.</p>
          </div>
        </div>
        
        {/* Question 3 */}
        <div className={styles['FAQ-question']}>
          <h2 onClick={() => setFaqQuestionsOpen(prevState => [prevState[0], prevState[1], !prevState[2]])}>
            <span className={styles['arrow-select']}>{faqQuestionsOpen[2] ? <BsFillCaretDownFill /> : <BsFillCaretRightFill />}</span> 
            Can I cancel my subscription?
          </h2>
          <div className={faqQuestionsOpen[2] ? `${styles['FAQ-content']} ${styles.open}` : styles['FAQ-content']}>
            <p>Yes, you can cancel your subscription anytime if its not for you. If you are looking to get a refund, contact our support team and we will review your request.</p>
            <p>Please read our terms for more info on refunds and subscriptions.</p>
          </div>
        </div>

      </div>
    </section>

      </div>


    </>
  )
}
