import './LocationInfo.css';

function LocationInfo({ location }) {
	const length = location.residents.length;

	return (
		<div className="location">
			<div className="location_container">
				<h2 className="location_name">{location.name}</h2>
				<ul className="location_info">
					<li className="location_item">
						<span className="location_span">Location type:</span>{location.type}
					</li>
					<li className="location_item">
						<span className="location_span">Dimension:</span>{location.dimension}
					</li>
					<li className="location_item">
						<span className="location_span">Dimension:</span>{`${length} ${length === 1 ? 'Resident' : 'Residents'}`}
					</li>
				</ul>
			</div>
		</div>
	);
}

export default LocationInfo;
