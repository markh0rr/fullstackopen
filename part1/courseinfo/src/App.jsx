const Header = ({courseName}) => {
  return (
    <h1>{courseName}</h1>
  )
}

const Part = ({part}) => {
  return (
    <p> {part.name} {part.exercises} </p>
  )
}

const Content = ({parts}) => {
  return (
    parts.map((part, index) => <Part key={index} part={part} />)
  )
}

const Total = ({parts}) => {
  const exerciseCount = parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <p>Number of exercises {exerciseCount}</p>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App