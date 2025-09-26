import { motion } from 'framer-motion';
import styles from '../../../../styles/courses/MainCourseContent.module.css';
import CodeBlock from '../../../page-construction/CodeBlock';
import { courseAnimations } from '../../../../lib/courseAnimations';

export default function Section2() {

    return (
        <motion.div
            variants={courseAnimations.sectionContent}
            initial="hidden"
            animate="visible"
        >
            <motion.h1 variants={courseAnimations.contentItem}>
                Basic elements
            </motion.h1>
            <motion.p variants={courseAnimations.contentItem}>
                Common elements include headings, paragraphs, and links.
            </motion.p>
            <motion.p variants={courseAnimations.contentItem}>
                 <code>
                    <span className={styles['bracket']}>&lt;</span>
                    <span className={styles['tag']}>h1</span>
                    <span className={styles['bracket']}>&gt;</span>
                </code> is the largest heading, <code>
                    <span className={styles['bracket']}>&lt;</span>
                    <span className={styles['tag']}>p</span>
                    <span className={styles['bracket']}>&gt;</span>
                </code> is for text, and <code>
                    <span className={styles['bracket']}>&lt;</span>
                    <span className={styles['tag']}>a</span>
                    <span className={styles['bracket']}>&gt;</span>
                </code> creates a link.
            </motion.p>
            <motion.div variants={courseAnimations.codeElement} className={styles['codeblock-wrapper']}>
                <CodeBlock code={'<h1>This is a heading</h1>\n<p>This is a paragraph</p>\n<a href="https://uni-sine.com">This is a link</a>'} language='xml' />
            </motion.div>

            <motion.p variants={courseAnimations.contentItem}>
                Elements tell the browser what kind of content is being displayed.
            </motion.p>
        </motion.div>
    );
}