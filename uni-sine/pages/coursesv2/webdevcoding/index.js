import CourseTree from "../../../components/coursesv2/coursetree/CourseTree"
import Content from "../../../components/coursesv2/content/Content"

// determine if tree or content needs to be shown

export default function Webdevcoding() {

    const courseList = [
        "HTML Syntax",
        "Basic Elements",
        "Practice: Create an element",
        "Nested Elements",
        "Practice: Nesting elements",
        "CSS Syntax",
        "Box model",
        "Practice: Element sizing",
        "Display Flex",
        "Display Block",
        "Practice: Display elements",
        "JavaScript",
        "Create elements with JS",
        "Practice: Develop a script"
    ]

    return <>
        <CourseTree courseList={courseList} />
    </>
}