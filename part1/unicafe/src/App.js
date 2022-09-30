import { useState } from 'react'

const Header = () => <h1>give feedback</h1>

const Button = ({text, handler}) => {
  return (
    <button onClick={handler}>
      {text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const [good, neutral, bad] = props.allData
  const Title = () => { 
    return (
      <thead>
        <tr>
          <th><h1>Statistics</h1></th>
        </tr>
      </thead>
  )};

  const total = good + neutral + bad
  const total_score = good - bad
  const positive_percent = good * 100 / total

  if ( total === 0) {
    return (
      <table>
        <Title />
        <tbody>
          <tr>
            <td>No feedback given</td>
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <table>
      <Title />
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={total_score / total} />
        <StatisticLine text="positive" value={`${positive_percent}%`} />
      </tbody>
    </table>
  )
}

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValue = (fn, newVal) => {
    console.log("setter:", fn)
    console.log("new value =", newVal)
    fn(newVal)
  }

  return (
    <>
      <Header />
      <Button text="good" handler={() => setGood(good+1)}/>
      <Button text="neutral" handler={() => setNeutral(neutral+1)}/>
      <Button text="bad" handler={() => setBad(bad+1)}/>
      <Statistics allData={[good, neutral, bad]} />
    </>
  )
}

export default App;
