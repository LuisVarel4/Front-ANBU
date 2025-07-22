import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import type { Notification } from '../../store/notifications/notifications.types';
import { useAppDispatch } from '../../store';
import {
  removeNotification,
  setDecisionStatus,
} from '../../store/notifications/slice';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { GiCancel } from 'react-icons/gi';
import { notificationsService } from '../../services/notifications/notifications.service.ts';
import { missionService } from '../../services/mission/mission.service.ts';

type Props = {
  notification: Notification;
};

const NotificationActions: React.FC<Props> = ({ notification }) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      await notificationsService.delete(notification.id);
      dispatch(removeNotification(notification.id));
    } catch (err) {
      console.error('❌ Error al eliminar notificación:', err);
    }
  };

  const handleDecision = async (status: 'accepted' | 'rejected') => {
    try {

      // 1. Si se acepta y es de tipo mission_join_request, llamamos al endpoint correspondiente
      if (
        status === 'accepted' &&
        notification.type === 'mission_join_request'
      ) {
        await missionService.acceptJoinRequest(notification.contextId!);
      }

      await notificationsService.updateDecisionStatus(notification.id, status);
      dispatch(
        setDecisionStatus({
          id: notification.id,
          status,
        }),
      );
    } catch (err) {
      console.error(`❌ Error al responder decisión:`, err);
    }
  };

  // ✅ Si es una solicitud de unión, permite decidir
  if (notification.type === 'mission_join_request') {
    if (notification.decisionStatus) {
      return (
        <div className="ml-2 flex items-center">
          <button onClick={handleDelete} title="Eliminar notificación">
            <AiOutlineDelete className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-700" />
          </button>
        </div>
      );
    }

    return (
      <div className="ml-2 flex items-center gap-2">
        <button onClick={() => handleDecision('accepted')}>
          <FaRegCircleCheck className="text-green-anbu h-5 w-5 cursor-pointer" />
        </button>
        <button onClick={() => handleDecision('rejected')}>
          <GiCancel className="text-red-anbu h-5 w-5 cursor-pointer" />
        </button>
      </div>
    );
  }

  // ✅ Para cualquier otro tipo, solo permite eliminar
  return (
    <div className="ml-2 flex items-center">
      <button onClick={handleDelete} title="Eliminar notificación">
        <AiOutlineDelete className="h-5 w-5 cursor-pointer text-blue-500 hover:text-blue-700" />
      </button>
    </div>
  );
};


export default NotificationActions;
