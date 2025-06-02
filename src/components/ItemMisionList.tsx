import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

interface MisionProps {
  captain: string;
  objective: string;
  deadline: string;
  level: string;
  status: string;
  isOwner?: boolean;
}

const ItemMisionList: React.FC<MisionProps> = ({
  captain,
  objective,
  deadline,
  level,
  status,
  isOwner = false,
}) => {
  return (
    <tr className={`${isOwner ? 'bg-red-anbu text-white' : 'bg-gray-200 text-black'}`}>
      <td className="px-4 py-2">{captain}</td>
      <td className="px-4 py-2">{objective}</td>
      <td className="px-4 py-2">{deadline}</td>
      <td className="px-4 py-2">
        <button className="border px-2 py-1 rounded">{level}</button>
      </td>
      <td className="px-4 py-2">
        <button className="border px-2 py-1 rounded bg-red-anbu text-white">{status}</button>
      </td>
      <td className="px-4 py-2 flex items-center justify-center gap-2">
        <FaWhatsapp className="text-green-600 cursor-pointer" />
        {isOwner && <FaEdit className="text-white cursor-pointer" />}
      </td>
    </tr>
  );
};

export default ItemMisionList;
