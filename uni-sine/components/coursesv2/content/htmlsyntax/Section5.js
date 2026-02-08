import { motion } from 'framer-motion';
import styles from '../../../../styles/courses/MainCourseContent.module.css';
import CodeBlock from '../../../page-construction/CodeBlock';
import { courseAnimations } from '../../../../lib/courseAnimations';

export default function Section5({ onAnimationComplete }) {

    return (
        <motion.div
            variants={courseAnimations.sectionContent}
            initial="hidden"
            animate="visible"
            onAnimationComplete={onAnimationComplete}
        >

            <motion.p variants={courseAnimations.contentItem}>
                Practice: draggable elements of code and user is asked to nest the elements so they are all together and styled correctly such as nesting elements of a profile banner
            </motion.p>
            
        </motion.div>
    );
}