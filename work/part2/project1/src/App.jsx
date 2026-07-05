import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Notes.jsx'

const App = (props) => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("add a note");
	const [showAll, setShowAll] = useState(true);

	console.log('render', notes.length, 'notes')

	useEffect(() => {
		const promise = axios.get('http://localhost:3001/notes');
		promise.then( response => {
			setNotes(response.data);
		}
		);
	}, [])


	const AddNote = (event) => {
		event.preventDefault();
		const newNoteObject = {
			id: notes.length+1,
			content: newNote,
			important: Math.random() < 0.5
		};
		setNotes(notes.concat(newNoteObject));
		setNewNote('');
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
			<ul> 
				{ notesToShow.map((note) => 
						<Note key={note.id} note={note}/>
				)} 
			</ul>

			<form onSubmit={AddNote}>
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
		</div>
	)
}

export default App
