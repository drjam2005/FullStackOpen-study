var triple = function(x) {
	return x * 3;
}

var waffle = triple;

console.log(waffle(30));

var animals = [
	{ name:'Fluffykins', species: 'rabbit' },
	{ name:'Caro', species: 'dog' },
	{ name:'Hamilton', species: 'dog' },
	{ name:'Harold', species: 'fish' },
];

var isSpecies = (species) => (animal) => animal.species === species; // quite interesting
var isNotSpecies = (species) => (animal) => animal.species !== species;
var dogs = animals.filter(isSpecies("dog"));
var nonDogs = animals.filter(isNotSpecies("dog"));

console.log("animals", animals);
console.log("dogs", dogs);
console.log("nonDogs", nonDogs);
