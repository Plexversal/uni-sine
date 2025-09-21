
import styles from '../../styles/courses/CourseTreeStats.module.css';

export default function CourseTreeStats() {
    return <div className={styles['course-tree-stats']}>
        <div className={styles['title-wrapper']}>
            <h1>Title based on props</h1>
            <p>Subheader of course description</p>
        </div>
        <div className={styles['stats-wrapper']}>
            <h1>Progress</h1>
            <div>0 - 100% complete circle</div>
            <p>0/12 Modules complete</p>
            <p>Questions correct first time: 11</p>
            <p>Medals</p>
            <div>Course Medals container</div>
        </div>

    </div>
}