import { useState } from 'react'

const Button = ({clickHandler, text}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const AnecdoteToShow = ({text, num}) => {
  return (
    <>
      {text} <br/>
      has {num} votes <br/>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voteNums, setVote] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)
  
  console.log("length of anecdotes array =", anecdotes.length)

  const randomAnecdote = () => {
    let len = anecdotes.length;
    let newSelected = Math.floor(Math.random()*len)
    console.log("new selected index =", newSelected)
    setSelected(newSelected)
  }

  const vote = () => {
    const voteCopy = [...voteNums]
    voteCopy[selected] += 1
    setVote(voteCopy)
    if (voteCopy[selected] > voteCopy[mostVoted]) {
      setMostVoted(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <AnecdoteToShow text={anecdotes[selected]} num={voteNums[selected]} />
      <Button clickHandler={vote} text="vote" />
      <Button clickHandler={randomAnecdote} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <AnecdoteToShow text={anecdotes[mostVoted]} num={voteNums[mostVoted]} />
    </div>
  )
}

export default App