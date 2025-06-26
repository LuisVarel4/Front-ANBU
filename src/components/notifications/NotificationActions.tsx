import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import type { Notification } from "../../store/notifications/notifications.types";
import { useAppDispatch } from "../../store";
import {
  removeNotification,
  setDecisionStatus,
} from "../../store/notifications/slice";
import { FaRegCircleCheck } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";

type Props = {
  notification: Notification;
};

const NotificationActions: React.FC<Props> = ({ notification }) => {
  const dispatch = useAppDispatch();

  if (notification.type === "decision") {
    // Si la decisión ya fue tomada, mostrar botón de eliminar
    if (notification.decisionStatus) {
      return (
        <div className="ml-2 flex items-center">
          <button
            onClick={() => dispatch(removeNotification(notification.id))}
            title="Eliminar notificación"
          >
            <AiOutlineDelete className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-700" />
          </button>
        </div>
      );
    }

    // Si la decisión aún no fue tomada, mostrar acciones
    return (
      <div className="ml-2 flex items-center gap-2">
        <button
          onClick={() =>
            dispatch(
              setDecisionStatus({
                id: notification.id,
                status: "accepted",
              }),
            )
          }
        >
          <FaRegCircleCheck className="text-green-anbu h-5 w-5 cursor-pointer" />
        </button>
        <button
          onClick={() =>
            dispatch(
              setDecisionStatus({
                id: notification.id,
                status: "rejected",
              }),
            )
          }
        >
          <GiCancel className="text-red-anbu h-5 w-5 cursor-pointer" />
        </button>
      </div>
    );
  }

  // Para otros tipos de notificación (no decision)
  return (
    <div className="ml-2 flex items-center">
      <button
        onClick={() => dispatch(removeNotification(notification.id))}
        title="Eliminar notificación"
      >
        <AiOutlineDelete className="h-5 w-5 cursor-pointer text-blue-500 hover:text-blue-700" />
      </button>
    </div>
  );
};

export default NotificationActions;
