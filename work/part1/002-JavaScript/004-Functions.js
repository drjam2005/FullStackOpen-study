// standard function stuff
// multiparameter
const sum = (p1, p2) => {
	return p1 + p2
}

const result = sum(1, 5)
// console.log(result) // prints 6

// single parameter
let square = p => {
	return p*p
}

// single statement
const squareFunc = p => p * p

const t = [1, 2, 3]
const tSquared = t.map(p => squareFunc(p))
console.log(tSquared)

// other ways to define functions
function product(a, b) {
	return a * b
}

const average = function(a, b) {
	return (a + b) / 2
}
