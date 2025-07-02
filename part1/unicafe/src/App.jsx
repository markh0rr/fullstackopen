import { useState } from 'react'

function Button({onClick, text}) {
  return <button onClick={onClick}>{text}</button>
}

function StatisticLine({text, value}) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

function Stats({feedback}) {
  const {good, neutral, bad} = feedback
  const all = good + neutral + bad

  if(all != 0) {
    const average = (good - bad) / all
    const positiveRatio = good / all
    return (
      <>
        <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={`${positiveRatio} %`} />
          </tbody>
        </table>
      </>
    )
  } else {
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }
}

function App() {
  const [feedback, setFeedback] = useState({"good": 0, "neutral": 0, "bad": 0})

  function getFeedbackHandler(category) {
    return () => {
      console.log()
      setFeedback(previousFeedback => ({
        ...previousFeedback,
        [category]: feedback[category] + 1
      }))
    }
  }

  return (
    <>
      <h2>give feedback</h2>
      <Button 
        onClick={getFeedbackHandler("good")}
        text="good" />
      <Button
        onClick={getFeedbackHandler("neutral")}
        text="neutral" />
      <Button 
        onClick={getFeedbackHandler("bad")}
        text="bad"/>
      <Stats feedback={feedback} />
    </> 
  )
}

export default App
