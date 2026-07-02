let nums = [
	1,2,3,4,5
]

const prodAll = (array) => {
	return array.reduce((prod, num) => {return prod * num}, 1)
}


console.log(prodAll(nums));
