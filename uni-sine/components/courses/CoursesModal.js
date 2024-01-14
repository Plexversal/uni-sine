import { useEffect, useState } from "react"
import LoadingIcon from "../page-construction/LoadingIcon";
import styles from "../../styles/Courses.module.css";
import WebDevelopmentCourse from './WebDevelopmentCourse';
import TrigonometryCourse from './TrigonometryCourse';
import BlackHolesCourse from './BlackHolesCourse';
import NuclearEnergyCourse from "./NuclearEnergyCourse";
import LocalNetworksCourse from './LocalNetworksCourse'
import LoadingIcons from 'react-loading-icons'
const courseMapping = {
  'Web Development': {
    component: WebDevelopmentCourse,
    maxContent: 15
  },
  'Trigonometry': {
    component: TrigonometryCourse,
    maxContent: 11
  },
  'Black Hole Formation': {
    component: BlackHolesCourse,
    maxContent: 12
  },
  'Nuclear Energy': {
    component: NuclearEnergyCourse,
    maxContent: 11
  },
  'Local Networks': {
    component: LocalNetworksCourse,
    maxContent: 12
  },
};

function CoursesModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [changedSection, setChangedSection] = useState(false)

  const CourseComponent = courseMapping[props.courseName].component || null;

  

  const handleClose = (e) => {
    props.onClose();
  };

  const handleNextButton = () => {
    if(currentSection == courseMapping[props.courseName].maxContent) return;
    setChangedSection(true)
    setTimeout(() => {
      setCurrentSection(currentSection + 1)
      setChangedSection(false)
    }, 800)
  }

  const handlePreviousButton = () => {
    if(currentSection == 0) return;
    setChangedSection(true)
    setTimeout(() => {
      setCurrentSection(currentSection - 1)
      setChangedSection(false)
    }, 800)
  }


  return (
    <>
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <div className={styles["container"]}>
          <div className={styles["courses-top"]}>
            <p>{props.courseName}</p>
          </div>
          <div className={styles["courses-content"]}>

            {CourseComponent ? 
            
            <CourseComponent {...{currentSection, setCurrentSection, courseName: props.courseName}} /> : <div>Error loading content</div>}

          </div>
          <div className={styles["courses-bottom"]}>
            <div>
              <button onClick={handleClose}>Close</button>
              <button>Ask Ai</button>
            </div>
              {
                changedSection && <LoadingIcons.TailSpin stroke="grey" width={50} height={30} />
              }
            <div>
              {
                currentSection !== 0 && <button onClick={handlePreviousButton}>{`Previous`}</button>
              }
              {
                currentSection !== courseMapping[props.courseName].maxContent && <button onClick={handleNextButton}>{`Next`}</button>
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CoursesModal;
