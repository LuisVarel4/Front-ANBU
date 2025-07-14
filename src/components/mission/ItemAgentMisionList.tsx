import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaTrash } from 'react-icons/fa';

interface Props {
  id: string;
  alias: string;
  fullName: string;
  email: string;
  role: string;
  isCaptain?: boolean;
  canRemove?: boolean;
  onRemove?: (agentId: string) => void;
}

const ItemAgentMisionList: React.FC<Props> = ({ 
  id,
  alias, 
  fullName,
  email, 
  role,
  isCaptain = false,
  canRemove = false,
  onRemove
}) => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate('/mission/chat', {
      state: { 
        agentId: id,
        agentAlias: alias 
      }
    });
  };

  const handleRemoveClick = () => {
    if (onRemove && !isCaptain) {
      onRemove(id);
    }
  };

  return (
    <tr className={`border-t-4 border-grayBlue-anbu font-semibold ${
      isCaptain ? "bg-red-anbu text-white" : "bg-gray2-anbu text-black"
    }`}>
      <td className="px-4 py-2">
        <div className="flex items-center gap-2">
          {isCaptain && <span className="text-yellow-300 text-xs">👑</span>}
          <span className={isCaptain ? "text-white font-bold" : "text-gray-600"}>
            {alias}
          </span>
        </div>
      </td>
      <td className="px-4 py-2">
        <span className={isCaptain ? "text-white font-bold" : "text-black font-bold"}>
          {fullName}
        </span>
      </td>
      <td className="px-4 py-2">
        <span className={isCaptain ? "text-white" : "text-gray-700"}>
          {email}
        </span>
      </td>
      <td className="px-4 py-2">
        <span className={`px-2 py-1 rounded text-xs ${
          isCaptain ? "bg-yellow-500 text-black" : 
          role === "kage" ? "bg-purple-500 text-white" :
          "bg-blue-500 text-white"
        }`}>
          {isCaptain ? "Capitán" : role}
        </span>
      </td>
      <td className="px-4 py-2 flex items-center justify-center">
        <button
          onClick={handleChatClick}
          className={`p-2 rounded-md transition ${
            isCaptain ? "bg-yellow-500 hover:bg-yellow-600 text-black" :
            "bg-green-500 hover:bg-green-600 text-white"
          }`}
          title="Abrir chat"
        >
          <FaWhatsapp />
        </button>
      </td>
      {canRemove && (
        <td className="px-4 py-2 flex items-center justify-center">
          {!isCaptain ? (
            <button
              onClick={handleRemoveClick}
              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
              title="Remover agente"
            >
              <FaTrash />
            </button>
          ) : (
            <span className="text-gray-400 text-xs">N/A</span>
          )}
        </td>
      )}
    </tr>
  );
};

export default ItemAgentMisionList;
