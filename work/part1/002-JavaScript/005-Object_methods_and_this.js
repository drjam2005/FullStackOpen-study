const arto = {
	name: 'Arto Hellas',
	age: 35,
	education: 'PhD',
	greet: function() {
		console.log('Hello, my name is ' + this.name)
	},
	doAddition: function(a, b) {
		console.log(a, b)
	}
}

arto.growOlder = function() {
	this.age += 1
}

arto.greet();

console.log('Age: ' + arto.age)
arto.growOlder();
console.log('Age: ' + arto.age)

arto.doAddition(1, 4)

const referenceToAddition = arto.doAddition
referenceToAddition(5, 6) // arto.doAddition is called

const referenceToGreet = arto.greet
referenceToGreet(); // 'Hello, my name is undefined', 'this' problem cuh
