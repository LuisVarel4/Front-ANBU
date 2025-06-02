import React from 'react';

import traidorSilueta from '../assets/ilustrations/anbu_jutsu.png'
import anbuDecoration from '../assets/logos/logo_blanco.png'

const traidoresData = [
	{ nombre: 'Carlos Itachi de Jesús', recompensa: "¥1'543.245.345" },
	{ nombre: 'Uribe Uchiha', recompensa: "¥1'489.384.167" },
	{ nombre: 'Trump Uzumaki', recompensa: "¥1'397.124.069" },
	{ nombre: 'Petro - San', recompensa: "¥1'111.888.777" },
	{ nombre: 'Luis Alfonso', recompensa: "¥999.999.999" },
	{ nombre: 'Aleja no Kage', recompensa: "¥897.041.202" },
	{ nombre: 'Emmanuel Shirogane', recompensa: "¥758.876.597" },
];

function TablaRecompensas() {
	return (
		// Contenedor principal para centrar y dar fondo a la página de ejemplo
		<div className="bg-gray-900 p-4 md:p-10 min-h-screen flex items-center justify-center">

			{/* El componente de la tabla en sí */}
			<div className="w-full max-w-lg bg-gray-800 rounded-xl shadow-lg overflow-hidden">
				<table className="w-full text-white">
					{/* Encabezado de la tabla */}
					<thead className="bg-gray-700/50">
					<tr>
						<th className="p-4 text-left font-semibold text-gray-300 border-r border-gray-600 w-1/2">
							Nombre Traidor
						</th>
						<th className="p-4 text-left font-semibold text-gray-300 w-1/2">
							Recompensa
						</th>
					</tr>
					</thead>

					{/* Cuerpo de la tabla */}
					<tbody>
					{traidoresData.map((traidor, index) => (
						<tr key={index} className="border-t border-gray-700">
							{/* Celda del Nombre */}
							<td className="p-4 align-middle">
								{traidor.nombre}
							</td>
							{/* Celda de la Recompensa */}
							<td className="p-4 text-right align-middle font-mono text-lg">
								{traidor.recompensa}
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>

		</div>
	);
}

function ListaNegra() {
	return (
		<div className="relative bg-black-anbu p-8">

			<div className="text-center mb-16">
				<h1 className="text-3xl md:text-4xl font-bold mb-2 text-red-anbu">
					LISTA NEGRA ANBU
				</h1>
				<p className="text-lg text-gray-400">
					Todos deben ser exterminados cuánto antes
				</p>
			</div>

			{TablaRecompensas()}


			<div className="flex flex-col items-center gap-6 mt-16">
				{/* Botón Principal */}

				<button className="bg-red-700 text-white font-bold py-3 px-12 rounded-md flex items-center gap-4 hover:bg-red-800 transition-colors">
					<span className="text-xl">⌖</span>
					Traidores prófugos
					<span className="text-xl">⌖</span>
				</button>

				{/* Botón Secundario */}
				<button className="bg-transparent border border-red-700 text-red-700 font-bold py-3 px-12 rounded-md flex items-center gap-4 hover:bg-red-700 hover:text-white transition-colors">
					Traidores exterminados
				</button>
			</div>


		</div>
	);
}

export default ListaNegra;