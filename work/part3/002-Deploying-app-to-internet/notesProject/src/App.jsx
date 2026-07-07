import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Notes.jsx'
import Footer from './components/Footer.jsx'
import noteService from './services/notes.js'
import Notification from './components/Notification.jsx'

const App = (props) => {
	const [notes, setNotes] = useState(null);
	const [newNote, setNewNote] = useState("add a note");
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		noteService
			.getAll()
			.then(
			initialNotes => { 
				setNotes(initialNotes);
			}
		)
	}, [])

	if(!notes)
		return null;

	const toggleImportanceOf = id => {
		const url = `http://localhost:3001/notes/${id}`;
		const note = notes.find(n => n.id === id);
		const changedNote = { ...note, important: !note.important};

		noteService
			.update(id, changedNote)
			.then(response => {
				setNotes(notes.map(note => note.id === id ? response : note))
			}).catch(error => {
				setErrorMessage(
					`the note ${changedNote.content} was already deleted in the server`
				);

				setTimeout(
					() => {
						setErrorMessage(null)
					}, 5000
				)
				setNotes(notes.filter(note => note.id !== id));
			})
	}

	const addNote = (event) => {
		event.preventDefault();
		const newNoteObject = {
			content: newNote,
			important: false
		};

		noteService.create(newNoteObject).then(
			response => {
				setNotes(notes.concat(response));
			}
		);
	}

	const handleNoteChange = (event) => {
		setNewNote(event.target.value);
	}

	const notesToShow = showAll ?
		notes :
		notes.filter((note) => note.important)

	return (
		<div>
			<h1> Notes </h1>
			<Notification message={errorMessage} />
			<ul> 
				{ notesToShow.map((note) => 
				<Note
					key={note.id}
					note={note}
					toggleImportance={() => {toggleImportanceOf(note.id);}}
					/>
				)} 
			</ul>

			<form onSubmit={addNote}>
				<input 
					value={newNote}
					onChange={handleNoteChange}
				/>
				<button type="submit">
					add
				</button>
			</form>
			<button onClick={() => {setShowAll(!showAll)}}>
				show {showAll ? 'important' : 'all'}
			</button>
			<Footer />
		</div>
	)
}

export default App
