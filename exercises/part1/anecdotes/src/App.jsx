import { useState } from 'react'

const getRandomInt = (max) => 
	( Math.floor(Math.random() * (max - 0 + 1)) + 0)

const Button = ({ text, onClick }) => 
	( <button onClick={onClick}> {text} </button>)

const DisplayAnecdote = ({ anecdote, votes }) => 
	( <div> {anecdote} <p> has {votes} votes </p> </div>)

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
  ];

	const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
	const [selected, setSelected] = useState(0);
	const [max, setMax] = useState(0);

	const incrementVote = (index) => {
		return () => {
			const copy = [...votes];
			copy[index] += 1;
			
			if(copy[index] > copy[max])
				setMax(index);

			setVotes(copy);
		}
	}

	return (
		<div>
			<div>
				<h1> Anecdote of the day </h1>
				<DisplayAnecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
				<Button text="vote" onClick={incrementVote(selected)} />
				<Button text="next anecdote" onClick={() => {setSelected(getRandomInt(anecdotes.length-1))}} />
			</div>
			<div>
				<h1> Anecdote with most votes </h1>
				<DisplayAnecdote anecdote={anecdotes[max]} votes={votes[max]}/>
			</div>
		</div>
	)
}

export default App
