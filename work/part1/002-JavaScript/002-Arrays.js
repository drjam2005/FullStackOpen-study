// standard array stuff
const t = [1, -1, 3]

t.push(5)

console.log(t.length)
console.log(t[1])

t.forEach( value => {
	console.log(value)
})

const t1 = [1, -1, 3]

//creates new array
const t2 = t1.concat(5)

console.log(t1)
console.log(t2)

const t3 = [1, 2, 3]

// creates new array as well
const m1 = t3.map(value => value * 2)
console.log(m1)

// creates html thing
const t4 = [1, 2, 3]
const m2 = t4.map(value => '<li>' + value + '</li>')
console.log(m2)

const t5 = [1, 2, 3, 4, 5]

// destructuring assignment
const [first, second, ...rest] = t5

console.log(first, second)
console.log(rest)
