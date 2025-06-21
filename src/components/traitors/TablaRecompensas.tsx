import type { Traidor } from '../../data/traidores';

interface TablaRecompensasProps {
  data: Traidor[];
}

function TablaRecompensas({ data }: TablaRecompensasProps) {
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
          {data.map(({ nombre, recompensa }, index) => (
            <tr key={index} className="border-b border-gray3-anbu last:border-b-0">
              <td className="p-3 align-middle text-gray3-anbu text-left text-base md:text-lg">{nombre}</td>
              <td className="p-3 text-right align-middle font-mono text-lg md:text-xl text-gray3-anbu">{recompensa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaRecompensas; 