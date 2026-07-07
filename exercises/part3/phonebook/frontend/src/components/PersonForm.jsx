const PersonForm = ({
			formHandler,
			inputHandler,
			nameVal,
			nameSet,
			numberVal,
			numberSet
		}) => 
{
	return (
		<form onSubmit={formHandler}>
			<div>
				name: 
				<input 
					value={nameVal}
					onChange={inputHandler(nameSet)}
				/>
			</div>
			<div>
				number: 
				<input 
					value={numberVal}
					onChange={inputHandler(numberSet)}
				/>
			</div>
			<div>
				<button type="submit">
					add
				</button>
			</div>
		</form>
	)
}

export default PersonForm
