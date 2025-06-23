import React from "react";
import { FaWhatsapp, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LabelTable from "./LabelTable";
import type { MissionPriority, MissionStatus } from "../../Enums/MissionEnum";

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
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/mision-detail", {
      state: {
        captain,
        objective,
        deadline,
        level,
        status,
        isOwner,
      },
    });
  };

  return (
    <tr
      className={`${isOwner ? "bg-red-anbu text-white" : "bg-gray-200 text-black"}`}
    >
      <td className="px-4 py-2">{isOwner ? "Yo" : captain}</td>
      <td className="px-4 py-2">{objective}</td>
      <td className="px-4 py-2">{deadline}</td>
      <td className="px-4 py-2">
        <LabelTable value={level as MissionPriority} type="priority" />
      </td>
      <td className="px-4 py-2">
        <LabelTable value={status as MissionStatus} type="status" />
      </td>
      <td className="flex items-center justify-center gap-3 px-4 py-2">
        <FaWhatsapp
          className="text-black-anbu cursor-pointer text-2xl"
          onClick={() =>
            navigate("/mission/chat", {
              state: { objective },
            })
          }
        />
        {isOwner && (
          <FaEdit
            className="cursor-pointer text-2xl text-white"
            onClick={handleEdit}
            title="Editar"
          />
        )}
      </td>
    </tr>
  );
};

export default ItemMisionList;
