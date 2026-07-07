const Person = ({ person, delFunction }) => {
	return (
		<li> {person.name} {person.number} 
			<button onClick={delFunction}>
				delete
			</button>
		</li>
	)
}

const Persons = ({ people, delFunction }) => {
	return (
		<ul>
			{
				people.map((person) => 
				<Person 
					key={person.id} 
					person={person}
					delFunction={delFunction(person.id)}/>
			)}
		</ul>
	)
}

export default Persons
