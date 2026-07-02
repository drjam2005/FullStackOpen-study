const Person = ({person}) => {
	return (
		<li> {person.name} {person.number} </li>
	)
}

const Persons = ({ people }) => {
	return (
		<ul>
			{
				people.map((person) => 
				<Person key={person.id} person={person}/>
			)}
		</ul>
	)
}

export default Persons
