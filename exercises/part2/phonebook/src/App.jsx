import { useState, useEffect } from 'react'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'

import axios from 'axios'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setName] = useState('');
	const [newNumber, setNumber] = useState('');
	const [newSearch, setSearch] = useState('');

	const handleInputChange = (setter) => {
		return (event) => setter(event.target.value);
	}

	useEffect(() => {
		console.log('promise');
		axios.get('http://localhost:3001/persons')
			.then(
				response => {
					setPersons(response.data);
					console.log('fulfilled, size: ', response.data.length);
				}
			)
	}, [])


	const addPerson = (event) => {
		event.preventDefault();
		if(persons.find((person) => person.name === newName)){
			alert(`${newName} is already added to phonebook`);
			return;
		}

		setPersons(persons.concat(
			{name: newName, number: newNumber, id: persons.length+1}
		));
		setName('');
		setNumber('');
	}

	const personsToShow = (newSearch.length > 0) ?
		persons.filter((person) => person.name.toLocaleLowerCase().includes(newSearch.toLowerCase()))
		: persons


	return (
		<div>
			<h2> Phonebook </h2>

			<Filter handler={handleInputChange} setter={setSearch} value={newSearch}/>

			<h3> add a new </h3>

			<PersonForm 
				formHandler={addPerson} 
				inputHandler={handleInputChange}
				nameVal={newName}
				nameSet={setName}
				numberVal={newNumber}
				numberSet={setNumber}
			/>

			<h3>Numbers</h3>

			<Persons people={personsToShow}/>
		</div>
	)
}

export default App
