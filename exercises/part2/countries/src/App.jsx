import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayCountrySolo = ({ country }) => {
	return (
		<div>
			<h1> {country.name.common} </h1>
			<div>
				{country.capital[0]}
				<br/>
				{country.area}
			</div>
			<div>
				<h2> Languages </h2>
				<ul>
					{Object.values(country.languages).map((lang, id) => <li key={id}>{lang}</li>)}
				</ul>
				<div>
					<img src={country.flags.png}/>
				</div>
			</div>
		</div>
	)
}

const DisplayCountryList = ({ countries }) => {
	if(!countries){
		return ( <div> </div>)
	}
	if(countries.length === 0){
		return ( <div> </div> )
	}
	if(countries.length === 1) {
		return <DisplayCountrySolo country={countries[0]}/>
	}
	if(countries.length >= 10){
		return (
			<div> Too many matches, specify another filter </div>
		)
	}

	return (
		<div>
			{countries.map((country, id) => 
				<div key={id}> {country.name.common} </div>
			)}
		</div>
	)
}


function App() {
	const [query, setQuery] = useState('');
	const [countries, setCountries] = useState(null);
	let [countriesToDisplay, setCountriesToDisplay] = useState(null);

	const handleQueryChange = (event) =>{
		setQuery(event.target.value);
	}

	useEffect(() => {
		axios
			.get('https://studies.cs.helsinki.fi/restcountries/api/all')
			.then(response => {
				setCountries(response.data);
			})
	}, []);

	useEffect(() => {
		if(!query)
			return;

		setCountriesToDisplay(countries.filter(country => { 
			return country.name.common.toLowerCase().includes(query.toLowerCase());
		}));
	}, [query]);

	if(!countries) {
		return (
			<div>
				Fetching countries... please wait...
			</div>
		)
	}

	return (
		<div>
			find countries <input value={query} onChange={handleQueryChange}/>
			<DisplayCountryList countries={countriesToDisplay} />
		</div>
	)
}

export default App
