var animals = [
	{ name:'Fluffykins', species: 'rabbit' },
	{ name:'Caro', species: 'dog' },
	{ name:'Hamilton', species: 'dog' },
	{ name:'Harold', species: 'fish' },
];

var names = animals.map((animal) => animal.name);

console.log(names)
