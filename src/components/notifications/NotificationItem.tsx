import React from 'react';
import type { Notification } from '../../store/notifications/notifications.types';
import NotificationActions from './NotificationActions';
import { useNavigate } from 'react-router-dom';

type Props = {
  notification: Notification;
};

const NotificationItem: React.FC<Props> = ({ notification }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!notification.contextId) return;

    switch (notification.type) {
      case 'mission_delayed':
        break;
      case 'mission_failed':
        break;
      case 'mission_bounty':
        break;
      case 'mission_join_request':
        break;
      case 'message':
        // TODO: Ruta al chat o canal
        navigate(`/mission/chat/${notification.contextId}`);
        break;
      default:
        break;
    }
  };

  return (
    <li
      onClick={handleClick}
      className={`border-b px-4 py-3 text-sm cursor-pointer transition-colors ${
        notification.isRead ? 'bg-gray2-anbu' : 'bg-gray3-anbu hover:bg-gray2-anbu'
      }`}
    >
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <p className="text-gray1-anbu">{notification.message}</p>
          {notification.count && notification.count > 1 && (
            <span
              className="ml-2 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
                {notification.count} mensajes nuevos
            </span>
          )}


          {notification.decisionStatus === 'accepted' && (
            <span className="text-xs text-green-anbu">✔ Aceptada</span>
          )}
          {notification.decisionStatus === 'rejected' && (
            <span className="text-xs text-red-anbu">✘ Rechazada</span>
          )}

          <div>
            <small className="text-gray-400">
              {new Date(notification.createdAt).toLocaleString()}
            </small>
          </div>
        </div>

        <NotificationActions notification={notification} />
      </div>
    </li>
  );
};

export default NotificationItem;
