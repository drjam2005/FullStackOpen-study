import Part from './Part.jsx'

const Content = (props) => (
	<div>
		{props.parts.map((part) => 
			<Part key={part.id} part={part} />
		)}
	</div>
)

export default Content
