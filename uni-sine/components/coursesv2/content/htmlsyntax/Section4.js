import { motion } from 'framer-motion';
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

export default function Section4({ onAnimationComplete }) {

    return (
        <motion.div
            variants={courseAnimations.sectionContent}
            initial="hidden"
            animate="visible"
            onAnimationComplete={onAnimationComplete}
        >
            <motion.h1 variants={courseAnimations.contentItem}>
                Nested elements
            </motion.h1>
            <motion.p variants={courseAnimations.contentItem}>
                Elements can go inside each other, this is called nesting.
            </motion.p>
            <motion.p variants={courseAnimations.contentItem}>
                For example, a {' '}
                 <code>
                    <span className={styles['bracket']}>&lt;</span>
                    <span className={styles['tag']}>div</span>
                    <span className={styles['bracket']}>&gt;</span>
                </code> can hold text, images, and links together.
            </motion.p>
            <motion.div variants={courseAnimations.codeElement} className={styles['codeblock-wrapper']}>
                <CodeBlock code={dedent(`
                    <div>
                        <p>This is a paragraph</p>
                        <a href="https://uni-sine.com">This is a link</a>
                    </div>
                `)} language='xml' />
            </motion.div>

            <motion.p variants={courseAnimations.contentItem}>
                Proper nesting makes your HTML structured and easier to style.
            </motion.p>
        </motion.div>
    );
}