import React from "react";
import { FaWhatsapp, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LabelTable from "./LabelTable";
import type { MissionPriority, MissionStatus } from "../../Enums/MissionEnum";

interface MisionProps {
  id: string;
  captain: string;
  objective: string;
  deadline: string;
  level: string;
  status: string;
  isOwner?: boolean;
  canEdit?: boolean;
  editPermission?: "full" | "status" | "read";
}

const ItemMisionList: React.FC<MisionProps> = ({
  id,
  captain,
  objective,
  deadline,
  level,
  status,
  isOwner = false,
  canEdit = false,
  editPermission = "read",
}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/mision-detail", {
      state: {
        id,
        captain,
        objective,
        deadline,
        level,
        status,
        isOwner,
        editPermission,
      },
    });
  };

  return (
    <tr
      className={`${isOwner ? "bg-red-anbu text-white" : "bg-gray-200 text-black"}`}
    >
      <td className="px-4 py-2 whitespace-nowrap">
        {isOwner ? "Yo" : captain}
      </td>
      <td className="px-4 py-2 whitespace-normal">{objective}</td>
      <td className="px-4 py-2 whitespace-nowrap">{deadline}</td>
      <td className="px-4 py-2 whitespace-nowrap">
        <LabelTable value={level as MissionPriority} type="priority" />
      </td>
      <td className="px-4 py-2 whitespace-nowrap">
        <LabelTable value={status as MissionStatus} type="status" />
      </td>
      <td className="flex items-center justify-center gap-3 px-4 py-2 whitespace-nowrap">
        <FaWhatsapp
          className="text-black-anbu cursor-pointer text-2xl"
          onClick={() =>
            navigate("/mission/chat", {
              state: { objective },
            })
          }
        />
        
        {/* Always show edit icon, but with different visual states */}
        <FaEdit
          className={`cursor-pointer text-2xl ${
            canEdit 
              ? isOwner 
                ? "text-white" 
                : "text-gray1-anbu hover:text-red-anbu"
              : "text-gray-400"
          } ${editPermission === "read" ? "opacity-50" : ""}`}
          onClick={handleEdit}
          title={
            editPermission === "full" 
              ? "Editar misión" 
              : editPermission === "status" 
                ? "Editar estado" 
                : "Ver detalles"
          }
        />
      </td>
    </tr>
  );
};

export default ItemMisionList;
