import CourseTreeStats from "../CourseTreeStats"

export default function CourseTree(props) {
    return <div>
        <CourseTreeStats />
        <div>
            <h1>Modules</h1>
            {props.courseList.map(e => {
                return <p>{e}</p>
            })}
        </div>
    </div>
}