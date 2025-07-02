import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

function Anecdote({text, votes}) {
  return (
    <>
      <h2>Anecdote of the day</h2>
      <p>
        {text}
      </p>
      <p>has {votes} votes</p>
    </>
  )
}

function Podium({anecdotes, votes}) {
  let maxVotes = 0
  let mostLikedAnecdotesIds = []
  for(let id in votes) {
    if(maxVotes < votes[id]) {
      mostLikedAnecdotesIds = [id]
      maxVotes = votes[id]
    } else if(maxVotes == votes[id]){
      mostLikedAnecdotesIds.push(id)
    }
  }

  if(maxVotes) {
    return (
      <>
        <h2>Anecdote with most votes</h2>
        <p>
          Most appreciated anecdote{(mostLikedAnecdotesIds.length>1)? "s" : ""} 
          — currently leading with {maxVotes} vote{(maxVotes>1)?"s":""}!
        </p>
        <ul>
          {mostLikedAnecdotesIds.map(id => <li>{anecdotes[id]}</li>)}
        </ul>
      </>
    )
  } else {
    return (
      <>
        <h2>Anecdote with most votes</h2>
        <p>
          Nobody's voted yet. Want to go first?
        </p>
      </>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const handleNewAnecdoteRequest = () => {
    const nextAnecdote = Math.floor(Math.random() * anecdotes.length)
    setSelected(nextAnecdote)
  }

  const handleVoteForAnecdote = () => {
    const updatedAnecdoteVotes = (votes[selected] || 0) + 1
    setVotes(prevVotes => ({
      ...prevVotes,
      [selected]: updatedAnecdoteVotes
    }))
  }

  return (
    <>
      <Anecdote 
        text={anecdotes[selected]}
        votes={votes[selected] || 0} />
      <Button 
        text="vote"
        onClick={handleVoteForAnecdote} />
      <Button 
        text="next anecdote"
        onClick={handleNewAnecdoteRequest} />
      <Podium anecdotes={anecdotes} votes={votes} />
    </>
  )
}

export default App