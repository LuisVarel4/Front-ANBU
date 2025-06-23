import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  alias: string;
  correo: string;
  especialidad: string;
}

const ItemAgentMisionList: React.FC<Props> = ({ alias, correo, especialidad }) => {
  const navigate = useNavigate();


  return (
    <tr className="bg-gray2-anbu text-black border-t-4 border-grayBlue-anbu font-semibold">
      <td className="px-4 py-2 text-gray-600">{alias}</td>
      <td className="px-4 py-2 text-black">
        <span className="font-bold">{correo}</span>
      </td>
      <td className="px-4 py-2 text-gray-700">{especialidad}</td>
      <td className="px-4 py-2 flex items-center justify-center">
        <button
          onClick={() => navigate('/agent-mision-list')}
          className="bg-gray-300 hover:bg-gray3-anbu text-black px-4 py-1 rounded-md text-sm transition"
        >
          Ver
        </button>
      </td>
    </tr>
  );
};

export default ItemAgentMisionList;
