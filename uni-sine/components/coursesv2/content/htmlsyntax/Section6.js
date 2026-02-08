import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from '../../../../styles/courses/MainCourseContent.module.css';
import CodeBlock from '../../../page-construction/CodeBlock';
import { courseAnimations } from '../../../../lib/courseAnimations';

// Helper function to remove indentation
const dedent = (str) => {
    const lines = str.split('\n');
    const minIndent = lines
        .filter(line => line.trim())
        .reduce((min, line) => {
            const indent = line.match(/^\s*/)[0].length;
            return Math.min(min, indent);
        }, Infinity);
    return lines.map(line => line.slice(minIndent)).join('\n').trim();
};

export default function Section6({ onAnimationComplete }) {
    const colors = ['red', '#3498db', 'rgb(46, 204, 113)','purple', 'hsla(300, 83%, 44%, 1.00)']
    const [colorIndex, setColorIndex] = useState(0);
    const currentColor = colors[colorIndex];

    useEffect(() => {
        const interval = setInterval(() => {
            setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }, 2300);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            variants={courseAnimations.sectionContent}
            initial="hidden"
            animate="visible"
            onAnimationComplete={onAnimationComplete}
        >
            <motion.h1 variants={courseAnimations.contentItem}>
                CSS Syntax
            </motion.h1>
            <motion.p variants={courseAnimations.contentItem}>
                CSS styles elements by selecting them and applying rules.
            </motion.p>
            <motion.p variants={courseAnimations.contentItem}>
                A rule has a selector, a{' '}
                <code>
                    <span className={styles['property']}>property</span>
                </code>, and a{' '}
                <code>
                    <span className={styles['property-value']}>value</span>
                </code>.
            </motion.p>
            <motion.div variants={courseAnimations.codeElement} className={styles['css-demo-container']}>
                <div className={styles['codeblock-wrapper']}>
                    <CodeBlock code={dedent(`
                        p {
                            color: ${currentColor};
                        }
                    `)} language='css' />
                </div>
                <div className={styles['preview-container']}>
                    <div className={styles['mac-preview-header']}>
                        <div className={styles['mac-preview-dots']}>
                            <span className={styles['dot-red']}></span>
                            <span className={styles['dot-yellow']}></span>
                            <span className={styles['dot-green']}></span>
                        </div>
                    </div>
                    <div className={styles['preview-content']}>
                        <p style={{ color: currentColor, transition: 'color 0.5s ease' }}>
                            The jumping fox!
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.p variants={courseAnimations.contentItem}>
                The color can be of different types for more customization, such as <code>HSL</code>, <code>Hex</code> and <code>RGB</code> values as you see above.
            </motion.p>
        </motion.div>
    );
}
