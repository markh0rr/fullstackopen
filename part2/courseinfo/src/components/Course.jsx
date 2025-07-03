const Part = ({part}) => <p>{part.name} {part.exercises} </p>

const TotalExercises = ({parts}) => {
    const total = parts.reduce((acc, part) => acc + part.exercises, 0)

    return (
        <strong>total of {total} exercises</strong>
    )
}

function Course({course}) {
    return (
        <>
            <h2>{course.name}</h2>
            {course.parts.map(part => 
                <Part key={part.id} part={part} />
            )}
            <TotalExercises parts={course.parts} />
        </>
    )
}

export default Course