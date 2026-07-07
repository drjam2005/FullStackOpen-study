const express = require('express');
const app = express();

app.use(express.json())

let phonebook = [
    {
      "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": "2",
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": "3",
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": "4",
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
	response.send('Go to http://localhost:3001/api/persons');
});

app.get('/api/persons', (request, response) => {
	response.json(phonebook);
});

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	const person = phonebook.find(p => p.id === id);
	if(person){
		response.json(person).exit();
	} else {
		response.status(404).end();
	}

});


app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	phonebook = phonebook.filter(p => p.id !== id);
	response.status(204).end();
})

app.post('/api/persons', (request, response) => {
	const body = request.body;
	if(!body){
		response.status(400).json({
			error: "must have request body!"
		}).end();
	}

	const personName = body.name;
	const personNumber = body.number;

	if(!personName || !personNumber){
		response.status(400).json({
			error: "must have name and number!",
		}).end();
		return;
	}

	if(phonebook.find(p => p.name.toLowerCase() === personName.toLowerCase())){
		response.status(400).json({
			error: "name must be unique",
		}).end();
		return;
	}

	const phoneBookEntry = {
		id: String(Math.floor(Math.random() * (9999 - 1 + 1)) + 1),
		name: personName,
		number: personNumber
	};

	phonebook = phonebook.concat(phoneBookEntry);
	response.json(phoneBookEntry);
})


app.get('/info', (request, response) => {
	response.send(`
		<div>
			Phonebook has info for ${phonebook.length} people
			<br/>
			${(new Date()).toString()}
		</div>
	`);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
