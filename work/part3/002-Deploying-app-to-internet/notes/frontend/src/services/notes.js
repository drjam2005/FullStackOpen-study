import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
	const allNotes = axios.get(baseUrl)
	return allNotes.then(response => response.data);
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
