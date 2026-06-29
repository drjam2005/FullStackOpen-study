// standard object stuff
const object1 = {
	name: 'Arto Hellas',
	age: 35,
	education: 'PhD',
}

const object2 = {
	name: 'Full Stack we application development',
	level: 'intermediate studies',
	size: 5,
}


// nested objects
const object3 = {
	name: {
		first: 'Dan',
		last: 'Abramov',
	},
	grades: [2, 3, 5, 3],
	department: 'Stanford University',
}

// referencing objetc chidren using '.' or ['fieldName']
console.log(object1.name)
const fieldName = 'age'
console.log(object1[fieldName])

// you can add more properties
object1.address = 'Helsinki'
object1['secret number'] = 12341
console.log(object1)


// objects can have methodsd (not included in the course)
const object4 = {
	name: 'James',
	printName: function() {
		console.log(this.name);
	}
}

object4.printName();
