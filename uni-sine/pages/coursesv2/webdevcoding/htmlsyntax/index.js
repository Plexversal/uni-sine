import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Section1 from "../../../../components/coursesv2/content/htmlsyntax/Section1";
import Section2 from '../../../../components/coursesv2/content/htmlsyntax/Section2';
import Section3 from '../../../../components/coursesv2/content/htmlsyntax/Section3';
import Section4 from '../../../../components/coursesv2/content/htmlsyntax/Section4';
import Section5 from '../../../../components/coursesv2/content/htmlsyntax/Section5';
import Section6 from '../../../../components/coursesv2/content/htmlsyntax/Section6';
import Section7 from '../../../../components/coursesv2/content/htmlsyntax/Section7';
import styles from '../../../../styles/courses/MainCourseContent.module.css';

// Array of all section components
const sections = [Section1, Section2, Section3, Section4, Section5, Section6, Section7];

export default function Htmlsyntax() {
    const [currentSection, setCurrentSection] = useState(1);
    const totalSections = sections.length;
    const sectionRefs = useRef([]);
    const [isAnimating, setIsAnimating] = useState(false);

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

    // Scroll to current section on mount
    useEffect(() => {
        if (currentSection > 1) {
            const timer = setTimeout(() => {
                sectionRefs.current[currentSection - 1]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);

            return () => clearTimeout(timer);
        }
    }, []); // Only run on mount

    const handleAnimationComplete = (sectionNumber) => {
        if (currentSection === sectionNumber) {
            setIsAnimating(false);
        }
    };

    const handleNext = () => {
        if (currentSection < totalSections && !isAnimating) {
            setIsAnimating(true);

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
                <button>Return to course list</button>
                <div>Progress: {currentSection}/{totalSections}</div>
                <div>XP: ------</div>

            </motion.div>

            <div className={styles['content-container']}>
                {sections.map((SectionComponent, index) => {
                    const sectionNumber = index + 1;
                    return currentSection >= sectionNumber && (
                        <motion.div
                            key={sectionNumber}
                            className={`${styles['section']} ${currentSection === sectionNumber ? styles['section-active'] : ''}`}
                            ref={el => sectionRefs.current[index] = el}
                            variants={sectionVariant}
                            initial="hidden"
                            animate="visible"
                        >
                            <SectionComponent
                                onAnimationComplete={() => handleAnimationComplete(sectionNumber)}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {currentSection < totalSections ? (
                <motion.button
                    className={styles['next-btn']}
                    onClick={handleNext}
                    disabled={isAnimating}
                    style={{
                        opacity: isAnimating ? 0.5 : 1,
                        cursor: isAnimating ? 'not-allowed' : 'pointer',
                        pointerEvents: isAnimating ? 'none' : 'auto'
                    }}
                >
                    Next
                </motion.button>
            ) : (
                <motion.button
                    className={styles['next-btn']}
                    onClick={() => console.log('Course completed!')}
                    disabled={isAnimating}
                    style={{
                        opacity: isAnimating ? 0.5 : 1,
                        cursor: isAnimating ? 'not-allowed' : 'pointer',
                        pointerEvents: isAnimating ? 'none' : 'auto'
                    }}
                >
                    Complete Course
                </motion.button>
            )}
        </div>
    );
}
