import { useState } from 'react'

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
      Number of exercises {totalEx}
    </p>
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
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}
export default App