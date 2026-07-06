import { useState, useEffect } from 'react'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import noteService from './service/notes.jsx'

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
		noteService
			.getAll()
			.then(response => {
				setPersons(response);
				console.log("data:", response);
			})
	}, [])


	const addPerson = (event) => {
		event.preventDefault();
		if(persons.find((person) => person.name === newName)){
			if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
				const personData = persons.filter(p => p.name === newName)[0];
				personData.number = newNumber;
				noteService.updateUser(personData.id, personData).then(response =>{
					setPersons(
						persons.map(p =>
							p.id === personData.id ?
							personData : p
						)
					);
				})
			}

			return;
		}

		const newPerson = {name: newName, number: newNumber, id: persons.length+1};
		noteService.create(newPerson).then(response => {
			console.log("person created:", response);
				setPersons(persons.concat( response));
				setName('');
				setNumber('');
			}
		)
	}

	const deletePerson = (id) => {
		return () => {
			if(window.confirm(`Delete ${persons.filter(p => p.id === id)[0].name}?`)){
				noteService.deleteData(id).then(response =>
				{
					setPersons(
						persons.filter(person => 
							person.id !== response.id
						)
					)
				});
			}
		}
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


			<button onClick={() => {
				noteService
					.getAll()
					.then(
						response => 
						console.log(response)
					)
				}}>
				test
			</button>
			<h3>Numbers</h3>

			<Persons people={personsToShow} delFunction={deletePerson}/>
		</div>
	)
}

export default App
