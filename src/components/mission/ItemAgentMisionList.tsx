import React from 'react';

interface Props {
  id: string;
  alias: string;
  fullName: string;
  email: string;
  role: string;
  isCaptain?: boolean;
}

const ItemAgentMisionList: React.FC<Props> = ({ 
  alias, 
  fullName,
  email, 
  role,
  isCaptain = false
}) => {
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
          isCaptain ? "bg-yellow-anbu text-black" : 
          role === "kage" ? "bg-purple-500 text-white" :
          "bg-green-anbu text-white"
        }`}>
          {isCaptain ? "Capitán" : role}
        </span>
      </td>
    </tr>
  );
};

export default ItemAgentMisionList;
