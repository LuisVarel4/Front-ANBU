//import traidorSilueta from '../assets/ilustrations/anbu_jutsu.png'
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
		<div className="w-full max-w-lg mx-auto rounded-2xl shadow-lg overflow-hidden bg-grayBlue-anbu">
			<table className="w-full">
				<thead>
					<tr>
						<th className="p-3 text-center font-semibold text-gray1-anbu bg-gray3-anbu rounded-tl-2xl text-base md:text-lg border-b border-gray3-anbu">Nombre Traidor</th>
						<th className="p-3 text-center font-semibold text-gray1-anbu bg-gray3-anbu rounded-tr-2xl text-base md:text-lg border-b border-gray3-anbu border-l border-gray2-anbu">Recompensa</th>
					</tr>
				</thead>
				<tbody>
					{traidoresData.map((traidor, index) => (
						<tr key={index} className="border-b border-gray3-anbu last:border-b-0">
							<td className="p-3 align-middle text-gray3-anbu text-left text-base md:text-lg">{traidor.nombre}</td>
							<td className="p-3 text-right align-middle font-mono text-lg md:text-xl text-gray3-anbu">{traidor.recompensa}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function ListaNegra() {
	return (
		<div className="flex flex-col md:flex-row items-center justify-center bg-black-anbu gap-8 md:gap-30 p-4 md:p-10">
			<div className="w-full md:w-auto flex justify-center">
				<TablaRecompensas />
			</div>

			<div className="text-center mt-8 md:mt-0">
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-red-anbu">
					LISTA NEGRA ANBU
				</h2>
				<p className="text-base sm:text-lg text-gray2-anbu max-w-md px-4 md:px-0">
					Traidores con mayor nivel de búsqueda dentro de la organización.
					<br />
					Todos deben ser exterminados cuanto antes.
				</p>
				<div className="flex flex-col items-center gap-3 mb-6 mt-6">
					<button className="flex items-center justify-between w-full sm:w-80 md:w-96 bg-red-anbu border-2 border-red-anbu text-gray3-anbu font-semibold text-base sm:text-lg rounded-xl py-2 sm:py-3 px-4 hover:bg-transparent hover:text-red-anbu transition-colors">
						<span className="text-xl mr-2">
							<img src={anbuDecoration} alt="decoración anbu" width={24} height={24} />
						</span>
						Traidores prófugos
						<span className="text-xl ml-2">
							<img src={anbuDecoration} alt="decoración anbu" width={24} height={24} />
						</span>
					</button>
					<button className="flex items-center justify-between w-full sm:w-80 md:w-96 bg-red-anbu border-2 border-red-anbu text-gray3-anbu font-semibold text-base sm:text-lg rounded-xl py-2 sm:py-3 px-4 hover:bg-transparent hover:text-red-anbu transition-colors">
						<span className="text-xl mr-2">
							<img src={anbuDecoration} alt="decoración anbu" width={24} height={24} />
						</span>
						Traidores exterminados
						<span className="text-xl ml-2">
							<img src={anbuDecoration} alt="decoración anbu" width={24} height={24} />
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default ListaNegra;