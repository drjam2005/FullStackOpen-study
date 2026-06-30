import React from 'react'

const Display = ({ counter }) => ( <div> Current Count: {counter} </div>)
const Button = ({onClick, text}) => ( <button onClick={onClick}> {text} </button>)

const App = () => {
	const [value, setValue] = React.useState(10)

	const handleClick = () => {
		console.log('clicked the button');
		setValue(0);
	}

	const hello = () => {
		const handler = () => console.log('hello world')
		return handler
	}

	return (
		<div>
			{value}
			<button onClick={hello()}> button </button>
		</div>
	)
}

export default App
