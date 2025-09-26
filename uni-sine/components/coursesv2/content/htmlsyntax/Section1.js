import { motion } from 'framer-motion';
import styles from '../../../../styles/courses/MainCourseContent.module.css';
import CodeBlock from '../../../page-construction/CodeBlock';
import { courseAnimations } from '../../../../lib/courseAnimations';

export default function Section1({ sectionNumber = 1 }) {

    return (
        <motion.div
            variants={courseAnimations.sectionContent}
            initial="hidden"
            animate="visible"
        >
            <motion.h1 variants={courseAnimations.contentItem}>
                Basic HTML {sectionNumber > 1 && `(Section ${sectionNumber})`}
            </motion.h1>
            <motion.p variants={courseAnimations.contentItem}>
                HTML is made of elements, written with tags inside angle brackets:
            </motion.p>
            <motion.div
                className={styles['basic-code-element']}
                variants={courseAnimations.codeElement}
            >
                {'< >'}
            </motion.div>
            <motion.p variants={courseAnimations.contentItem}>
                Most elements have an opening {' '}
                <code>
                    <span className={styles['bracket']}>&lt;</span>
                    <span className={styles['tag']}>div</span>
                    <span className={styles['bracket']}>&gt;</span>
                </code> and a closing {' '}
                <code>
                    <span className={styles['bracket']}>&lt;/</span>
                    <span className={styles['tag']}>div</span>
                    <span className={styles['bracket']}>&gt;</span>
                </code>
            </motion.p>
            <motion.p variants={courseAnimations.contentItem}>
                The <code><span className={styles['bracket']}>/</span></code> designates a closing tag.
            </motion.p>
        </motion.div>
    );
}