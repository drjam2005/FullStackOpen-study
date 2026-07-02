const Filter = ({handler, setter, value}) => {
	return (
		<div>
			filter shown with a <input 
				value={value} 
				onChange={handler(setter)}
			/>
		</div>
	)
}

export default Filter
