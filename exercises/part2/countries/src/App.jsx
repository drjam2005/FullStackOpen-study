import { useState, useEffect } from 'react'
import axios from 'axios'

const CapitalWeather = ({ capital }) => {
	let [weatherData, setWeatherData] = useState(null);

	useEffect(() => {
		axios
			.get(`https://wttr.in/${capital}?format=j1`)
			.then(response => {
				setWeatherData(response.data);
			}).catch(error => {
				console.log("Fetch Error:", error);
			})
	}, [capital]);

	if(!weatherData) return (
		<div> </div>
	)

	return (
		<div>
			Temperature {weatherData.current_condition[0].FeelsLikeC} Celcius
			<br/>
			Wind {(weatherData.current_condition[0].windspeedKmph / 3.6).toFixed(1)} m/s
		</div>
	)
}

const DisplayCountrySolo = ({ country }) => {


	if(!country)
		return null

	const capital = country.capital[0];

	return (
		<div>
			<h1> {country.name.common} </h1>
			<div>
				Capital {capital}
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
				<div>
					<h2> Weather in {capital} </h2>
					<CapitalWeather capital={capital} />
				</div>
			</div>
		</div>
	)
}

const DisplayCountryList = ({ countries, onClick }) => {
	if(!countries)
		return null
	if(countries.length <= 1)
		return null
	if(countries.length >= 10)
		return (
			<div> Too many matches, specify another filter </div>
		)

	return (
		<div>
			{countries.map((country, id) => 
			<div key={id}> {country.name.common} 
				<button onClick={onClick(country)}>
					Show
				</button>
			</div>
			)}
		</div>
	)
}

function App() {
	const [query, setQuery] = useState('');
	const [countries, setCountries] = useState(null);
	let [countriesToDisplay, setCountriesToDisplay] = useState(null);
	let [countryToDisplay, setCountryToDisplay] = useState(null);

	const handleQueryChange = (event) =>{
		setQuery(event.target.value);
	}

	const showCountry = (country) => {
		return () => {
			setCountryToDisplay(country);
		}
	}

	useEffect(() => {
		axios
			.get('https://studies.cs.helsinki.fi/restcountries/api/all')
			.then(response => {
				setCountries(response.data);
			})
	}, []);

	useEffect(() => {
		if (!query || !countries) return;

		const displayList = countries.filter(country =>
			country.name.common.toLowerCase().includes(query.toLowerCase())
		);

		setCountryToDisplay(null);
		setCountriesToDisplay(displayList);

		if (displayList.length === 1) {
			setCountryToDisplay(displayList[0]);
		}
	}, [query, countries]);

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
			<DisplayCountryList countries={countriesToDisplay} onClick={showCountry}/>
			<DisplayCountrySolo country={countryToDisplay} />
		</div>
	)
}

export default App
