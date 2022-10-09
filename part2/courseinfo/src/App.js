
const Header = (props) => <h1>{props.course.name}</h1>

const Part = ({part}) => {
  console.log("In Part:", {part})
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  const items = parts.map((pt, idx) => (<Part part={pt} key={idx} />))
  return (
    <div>
      {items}
    </div>
  )
}

const Total = ({parts}) => {
  console.log("In Total:", {parts})
  const totalEx = parts.reduce((acc, cur) => {return acc+cur.exercises}, 0)
  console.log("totalEx =", totalEx)

  return (
    <p>
      <b>Number of exercises {totalEx} </b>
    </p>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

function App() {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App;
