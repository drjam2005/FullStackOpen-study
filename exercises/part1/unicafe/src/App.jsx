import { useState } from 'react'

const Button = ({ text, onClick }) => 
	(<button onClick={onClick}> {text} </button>)

const Header = ({ text }) => 
	(<h1> {text} </h1>)


const StatisticLine = ({name, value}) => 
	(<tr><td> {name} </td><td> {value} </td></tr>)


const Statistics = (props) => {
	const givenGood = props.good;
	const givenNeutral = props.neutral;
	const givenBad = props.bad;

	const all = givenGood + givenNeutral + givenBad;
	const average = ((givenGood * 1) + (givenBad * -1)) / all;
	const positive = givenGood / all;

	if(all === 0){
		return (
			<div>
				<Header text="statistics" />
				No feedback given
			</div>
		)
	}

	return (
		<div>
			<Header text="statistics" />

			<table>
				<tbody>
					<StatisticLine name="good" value={givenGood} />
					<StatisticLine name="neutral" value={givenNeutral} />
					<StatisticLine name="bad" value={givenBad} />
					<StatisticLine name="all" value={all} />
					<StatisticLine name="average" value={average.toFixed(1)} />
					<StatisticLine name="positive" value={String((positive*100).toFixed(1)) + "%"} />
				</tbody>
			</table>
		</div>
	)
}

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const incrementScore = (variable, setter) => {
		return () => {
			setter(variable + 1);
		};
	};

	return (
		<div>
			<Header text="give feedback" />

			<Button text="good" onClick={incrementScore(good, setGood)} />
			<Button text="neutral" onClick={incrementScore(neutral, setNeutral)} />
			<Button text="bad" onClick={incrementScore(bad, setBad)} />

			<Statistics good={good} neutral={neutral} bad={bad}/>
		</div>
	)
}

export default App
