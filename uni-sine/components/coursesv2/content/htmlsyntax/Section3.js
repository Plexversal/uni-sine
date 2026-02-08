import { motion } from 'framer-motion';
import styles from '../../../../styles/courses/MainCourseContent.module.css';
import CodeBlock from '../../../page-construction/CodeBlock';
import { courseAnimations } from '../../../../lib/courseAnimations';

export default function Section3({ onAnimationComplete }) {

    return (
        <motion.div
            variants={courseAnimations.sectionContent}
            initial="hidden"
            animate="visible"
            onAnimationComplete={onAnimationComplete}
        >

            <motion.p variants={courseAnimations.contentItem}>
                Practice: create a H2 tag in some pre-made html with a single line text box for the user to code in
            </motion.p>
            
        </motion.div>
    );
}