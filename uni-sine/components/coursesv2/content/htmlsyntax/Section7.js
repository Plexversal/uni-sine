import { motion } from 'framer-motion';
import styles from '../../../../styles/courses/MainCourseContent.module.css';
import { courseAnimations } from '../../../../lib/courseAnimations';

export default function Section7({ onAnimationComplete }) {

    return (
        <motion.div
            variants={courseAnimations.sectionContent}
            initial="hidden"
            animate="visible"
            onAnimationComplete={onAnimationComplete}
        >
            <motion.h1 variants={courseAnimations.contentItem}>
                Box Model
            </motion.h1>
            <motion.p variants={courseAnimations.contentItem}>
                Every element is a box made of content, padding, border, and margin.
            </motion.p>
            <motion.p variants={courseAnimations.contentItem}>
                Padding adds space inside the element, margin adds space outside.
            </motion.p>
            <motion.p variants={courseAnimations.contentItem}>
                Borders sit between padding and margin.
            </motion.p>
        </motion.div>
    );
}
