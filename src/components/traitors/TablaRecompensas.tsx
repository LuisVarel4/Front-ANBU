import type { Traidor } from "../../data/traidores";
import { ScrollArea } from "../ui";

interface TablaRecompensasProps {
  data: Traidor[];
}

function TablaRecompensas({ data }: TablaRecompensasProps) {
  return (
    <div className="bg-grayBlue-anbu mx-auto w-full max-w-lg overflow-hidden rounded-2xl shadow-lg">
      <table className="w-full table-fixed">
        <thead>
          <tr>
            <th className="text-gray1-anbu bg-gray3-anbu border-gray3-anbu rounded-tl-2xl border-b p-3 text-center text-base font-semibold md:text-lg">
              Nombre Traidor
            </th>
            <th className="text-gray1-anbu bg-gray3-anbu border-gray3-anbu rounded-tr-2xl border-b border-l p-3 text-center text-base font-semibold md:text-lg">
              Recompensa
            </th>
          </tr>
        </thead>
      </table>
      <ScrollArea className="max-h-64">
        <table className="w-full table-fixed">
          <tbody>
            {data.map(({ nombre, recompensa }, index) => (
              <tr
                key={index}
                className="border-gray3-anbu border-b last:border-b-0"
              >
                <td className="text-gray3-anbu p-3 text-center align-middle text-base md:text-lg">
                  {nombre}
                </td>
                <td className="text-gray3-anbu p-3 text-center align-middle font-mono text-lg md:text-xl">
                  {recompensa}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
}

export default TablaRecompensas;
