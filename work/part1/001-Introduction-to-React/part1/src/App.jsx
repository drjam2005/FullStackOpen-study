import React from 'react'

const Hello = (props) => {
	return (
		<div>
			<p> 
				Hello, World! {props.name} 
			</p>
		</div>
	)
}

const Footer = () => {
	return (
		<div>
			greeting app created by <a href='https://github.com/drjam2005'>drjam2005</a>
		</div>
	)
}

const ObjectRenderingTest = () => {
	const friends = [
		{ name: 'Peter', age: 4 },
		{ name: 'Mark', age: 9 },
	]

	return (
		<div>
			<p> {friends[0].name} {friends[0].age}</p>
			<p> {friends[1].name} {friends[1].age}</p>
		</div>
	)
}

const App = () => {
	return (
		<div>
			<ObjectRenderingTest />
		</div>
	)
//	return (
//		<div>
//			<h1> Greetings!  </h1>
//			<Hello name="Mark"/>
//			<Footer />
//		</div>
//	)
}

export default App
