import React from 'react'

const Display = ({ val }) => {
	return (
		<div> Current Count: {val} </div>
	)
}
const Button = ({onClick, text}) => { 
	return (
		<button onClick={onClick}> {text} </button>
	)
}

const App = () => {
	const [value, setValue] = React.useState(10)

	const setToValue = (givenVal) => {
		return (
			() => { setValue(givenVal); }
		)
	}

	return (
		<div>
			<Display val={value}/>
			<br/>
			<Button onClick={setToValue(value + 1)} text="increase" />
			<Button onClick={setToValue(value - 1)} text="decrease" />
		</div>
	)
}

export default App
