import { useState, useEffect } from 'react';
import { useFetchApi } from './hooks/useFetchApi';
import Search from './components/Search';
import Hero from './components/Hero';
import LocationInfo from './components/LocationInfo';
import ResidentsList from './components/ResidentsList';
import { getRandomNumber } from './utils';

const baseUrl = 'https://rickandmortyapi.com/api/location/';

function App() {
	const { data: location, loading, request } = useFetchApi();
	const [locationId, setLocationId] = useState(getRandomNumber());

	useEffect(() => {
		request(`${baseUrl}${locationId}`);
	}, [locationId, request]);

	return (
		<div>
			{/* Hero */}
			<Hero />

			{/* Search */}
			<Search setLocationId={setLocationId} />

			{/* LocationInfo */}
			{loading ? (
				<p>Cargando...</p>
			) : (
				location && <LocationInfo location={location} />
			)}

			{/* ResidentsList */}
			{location && <ResidentsList residents={location.residents} />}
		</div>
	);
}

export default App;
