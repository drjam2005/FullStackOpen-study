import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
	const allNotes = axios.get(baseUrl)
	const fake = {
		id: 10000,
		content: 'fake notes!',
		important: true,
	};
	return allNotes.then(response => response.data.concat(fake))
}

const create = newObject => {
	const object = axios.post(baseUrl, newObject);
	return object.then(response => response.data);
}

const update = (id, newObject) => {
	const object = axios.put(`${baseUrl}/${id}`, newObject);
	return object.then(response => response.data);
}
 
export default {
	getAll,
	create,
	update
}
