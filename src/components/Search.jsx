import { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Search.css';
import { Box, Field, Input, Button } from "@chakra-ui/react"

function Search({ setLocationId }) {
	const [query, setQuery] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [error, setError] = useState('');
	const searchRef = useRef(null);

	
	
	const handleInputChange = async (e) => {
		const value = e.target.value;
		setQuery(value);

		if (value.length > 0) {
			try {
				const response = await fetch(
					`https://rickandmortyapi.com/api/location/?name=${value}`,
				);
				const data = await response.json();
				if (data.results) {
					setSuggestions(data.results);
					setError('');
				} else {
					setSuggestions([]);
					setError('No locations found.');
				}
			} catch (error) {
				console.error('Error fetching locations:', error);
				setSuggestions([]);
				setError('An error occurred while fetching data.');
			}
		} else {
			setSuggestions([]);
			setError('Please enter a valid name.'); // Mensaje de error para campo vacío
		}
	};

	const handleSuggestionClick = (location) => {
		setLocationId(location.id);
		setQuery(location.name);
		setSuggestions([]);
		setError('');
	};

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (searchRef.current && !searchRef.current.contains(e.target)) {
				setSuggestions([]);
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div className="search" ref={searchRef}>
			<div className="search_container">
			
			<Field.Root>
			<Field.Label style={{margin: "0px 0px 0px 0	px"}}>Search location by name or ID</Field.Label>
      <Box pos="relative" w="full">
        <Input className="peer input_style" placeholder="Ex: Citadel of Ricks" type="text"
	  value={query}
	  onChange={handleInputChange}
	  variant="flushed"/>
      
      </Box>
    </Field.Root>
				<Button className="search_button">
					<FaSearch /> Search
				</Button>
			</div>
			{error && <p className="search_error">{error}</p>}
			{suggestions.length > 0 && (
				<ul className="suggestions_list">
					{suggestions.map((location) => (
						<li
							key={location.id}
							className="suggestion_item"
							onClick={() => handleSuggestionClick(location)}
						>
							{location.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default Search;
