import { useState } from 'react'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	])

	const [newName, setName] = useState('');
	const [newNumber, setNumber] = useState('');
	const [newSearch, setSearch] = useState('');

	const handleInputChange = (setter) => {
		return (event) => setter(event.target.value);
	}

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
