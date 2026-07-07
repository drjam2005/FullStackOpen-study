import axio from 'axios'

// const baseUrl = 'http://localhost:3001/persons'
const baseUrl = '/api/persons'

const getAll = () => {
	const response = axio.get(baseUrl).then( response => response.data)
	return response;
}

const create = (personData) => {
	const response = axio.post(baseUrl, personData).then(response => response.data);
	return response;
}

const deleteData = (personID) => {
	const response = axio.delete(`${baseUrl}/${personID}`).then(response => response.data);
	return response;
}

const updateUser = (personID, personData) => {
	const response = axio.put(`${baseUrl}/${personID}`, personData).then(response => response.data);
	return response;
}

export default {
	getAll,
	create,
	deleteData,
	updateUser
}
