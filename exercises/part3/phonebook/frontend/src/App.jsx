import { useState, useEffect } from 'react'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import noteService from './service/notes.jsx'
import Notification from './components/Notification.jsx'

import axios from 'axios'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setName] = useState('');
	const [newNumber, setNumber] = useState('');
	const [newSearch, setSearch] = useState('');
	const [notifMessage, setNotifMessage] = useState(null);
	const [isNotifError, setIsNotifError] = useState(false);

	const handleInputChange = (setter) => {
		return (event) => setter(event.target.value);
	}

	useEffect(() => {
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
			if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
			{
				const personData = persons.find(p => p.name === newName);
				personData.number = newNumber;
				noteService.updateUser(personData.id, personData).then(response =>{
					setPersons(persons.map(p => p.id === personData.id ?  personData : p));
					updateNotification(`Updated ${response.name}`, false);
				}).catch(response =>{
					updateNotification(`Information of ${personData.name} has already been removed from the server`, true);
					setPersons(persons.filter(p => p.id !== personData.id));
				})
			}

			return;
		}

		const newPersonData = {name: newName, number: newNumber, id: persons.length+1};
		noteService.create(newPersonData).then(response => {
			console.log("person created:", response);
				updateNotification(`Added ${newPersonData.name}`, false);
				setPersons(persons.concat( response));
				setName('');
				setNumber('');
			}
		)
	}

	const updateNotification = (message, isError) => {
		setIsNotifError(isError);
		setNotifMessage(message);
		setTimeout(
			() => {
				setNotifMessage(null);
			}, 5000
		)
	}

	const deletePerson = (id) => {
		return () => {
			const personName = persons.find(p => p.id === id).name
			if(window.confirm(`Delete ${personName}?`)){
				noteService.deleteData(id).then(response =>
				{
					updateNotification(
						`Deleted ${personName}`, false
					)
					setPersons(
						persons.filter(person => 
							person.id !== response.id
						)
					);
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
			<Notification message={notifMessage} isError={isNotifError}/>

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
