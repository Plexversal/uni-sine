import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Section1 from "../../../../components/coursesv2/content/htmlsyntax/Section1";
import Section2 from '../../../../components/coursesv2/content/htmlsyntax/Section2';
import styles from '../../../../styles/courses/MainCourseContent.module.css';

export default function Htmlsyntax() {
    const [currentSection, setCurrentSection] = useState(1);
    const totalSections = 3;
    const sectionRefs = useRef([]);

    useEffect(() => {
        const setNavbarHeight = () => {
            const navbar = document.querySelector('#navbar, [id*="navbar"]');
            if (navbar) {
                const navbarHeight = navbar.offsetHeight;
                document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
            }
        };

        setNavbarHeight();
        window.addEventListener('resize', setNavbarHeight);

        return () => window.removeEventListener('resize', setNavbarHeight);
    }, []);

    const handleNext = () => {
        if (currentSection < totalSections) {
            const next = currentSection + 1;
            setCurrentSection(next);
            setTimeout(() => {
                sectionRefs.current[next - 1]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 50);
        }
    };

    const sectionVariant = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <div className={styles['full-course-container']}>
            <motion.div
                className={styles['progress-bar']}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                Progress: {currentSection}/{totalSections}
            </motion.div>

            <div className={styles['content-container']}>
                {/* Section 1 */}
                {currentSection >= 1 && (
                    <motion.div
                        className={`${styles['section']} ${currentSection === 1 ? styles['section-active'] : ''}`}
                        ref={el => sectionRefs.current[0] = el}
                        variants={sectionVariant}
                        initial="hidden"
                        animate="visible"
                    >
                        <Section1 />
                    </motion.div>
                )}

                {/* Section 2 */}
                {currentSection >= 2 && (
                    <motion.div
                        className={`${styles['section']} ${currentSection === 2 ? styles['section-active'] : ''}`}
                        ref={el => sectionRefs.current[1] = el}
                        variants={sectionVariant}
                        initial="hidden"
                        animate="visible"
                    >
                        <Section2 />
                    </motion.div>
                )}

                {/* Section 3 */}
                {currentSection >= 3 && (
                    <motion.div
                        className={`${styles['section']} ${currentSection === 3 ? styles['section-active'] : ''}`}
                        ref={el => sectionRefs.current[2] = el}
                        variants={sectionVariant}
                        initial="hidden"
                        animate="visible"
                    >
                        <Section1 />
                    </motion.div>
                )}
            </div>

            {currentSection < totalSections ? (
                <motion.button
                    className={styles['next-btn']}
                    onClick={handleNext}
                    whileTap={{ scale: 0.95 }}
                >
                    Next
                </motion.button>
            ) : (
                <motion.button
                    className={styles['next-btn']}
                    onClick={() => console.log('Course completed!')}
                    whileTap={{ scale: 0.95 }}
                >
                    Complete Course
                </motion.button>
            )}
        </div>
    );
}
