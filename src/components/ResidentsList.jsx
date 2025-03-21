import { useState } from 'react';
import ResidentCard from './ResidentCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './ResidentsList.css';

function ResidentsList({ residents }) {
	const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
	const residentsPerPage = 8; // Número de residentes por página

	// Calcular el índice de los residentes a mostrar
	const indexOfLastResident = currentPage * residentsPerPage;
	const indexOfFirstResident = indexOfLastResident - residentsPerPage;
	const currentResidents = residents.slice(
		indexOfFirstResident,
		indexOfLastResident,
	);

	// Calcular el número total de páginas
	const totalPages = Math.ceil(residents.length / residentsPerPage);

	// Función para cambiar de página
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	// Función para ir a la página anterior
	const goToPreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	// Función para ir a la página siguiente
	const goToNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	// Calcular el rango de páginas a mostrar
	const getPageRange = () => {
		const range = 2; // Número de páginas a mostrar a cada lado de la página actual
		let start = Math.max(1, currentPage - range);
		let end = Math.min(totalPages, currentPage + range);

		// Ajustar el rango si estamos cerca de los extremos
		if (currentPage - range < 1) {
			end = Math.min(totalPages, end + (range - (currentPage - 1)));
		}
		if (currentPage + range > totalPages) {
			start = Math.max(1, start - (range - (totalPages - currentPage)));
		}

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	};

	return (
		<>
			<div className="residents">
				{currentResidents.map((resident) => (
					<ResidentCard key={resident} url={resident} />
				))}
			</div>
			{residents.length > residentsPerPage && (
				<div className="pagination">
					<button
						className={`pagination_button ${
							currentPage === 1 ? 'disabled' : ''
						}`}
						onClick={goToPreviousPage}
						disabled={currentPage === 1}
					>
						<FaChevronLeft /> {/* Ícono de flecha izquierda */}
					</button>
					{getPageRange().map((page) => (
						<button
							key={page}
							className={`pagination_button ${
								currentPage === page ? 'active' : ''
							}`}
							onClick={() => paginate(page)}
						>
							{page}
						</button>
					))}
					<button
						className={`pagination_button ${
							currentPage === totalPages ? 'disabled' : ''
						}`}
						onClick={goToNextPage}
						disabled={currentPage === totalPages}
					>
						<FaChevronRight /> {/* Ícono de flecha derecha */}
					</button>
				</div>
			)}
			{residents.length === 0 && (
				<h2 className="no-residents">There are no residents.</h2>
			)}
		</>
	);
}

export default ResidentsList;
