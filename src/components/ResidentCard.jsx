import { useEffect } from 'react';
import { useFetchApi } from '../hooks/useFetchApi';
import './ResidentCard.css';
import { Box, Circle, Float } from "@chakra-ui/react"
function ResidentCard({ url }) {
	const { data: resident, request, loading } = useFetchApi();

	useEffect(() => {
		request(url);
	}, [url]);

	if (loading) return <p>Cargando...</p>;

	const episodes = resident?.episode?.length || 1;



	return (
		<>
			{resident && (
				<div className="resident-card">
					<div className="resident_header">
						
						<img
							className="resident_img"
							src={resident.image}
							alt={resident.name}
						/>
						<p className="resident_status">
							{resident?.status === 'Alive' ? <p>🟢 Alive</p> : <p>🔴 Dead</p>}
						</p>
					</div>
					<div className="resident_body">
						<h2 className="resident_name">{resident.name}</h2>
						<ul className="resident_info">
							<li className="resident_item c1">
								<span className="resident_span">Specie:</span>{' '}
								{resident.species}
							</li>
							<li className="resident_item c2">
								<span className="resident_span">Origin:</span>{' '}
								{resident.origin.name}
							</li>
							<li className="resident_item c3">
								<span className="resident_span">Episodes where appear:</span>{' '}
								{episodes} {episodes === 1 ? 'episode' : 'episodes'}
							</li>
						</ul>
					</div>
				</div>
			)}
		</>
	);
}

export default ResidentCard;
