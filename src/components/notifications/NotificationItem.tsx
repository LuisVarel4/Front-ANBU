import React from "react";
import type { Notification } from "../../store/notifications/notifications.types";
import NotificationActions from "./NotificationActions";

type Props = {
    notification: Notification;
};

const NotificationItem: React.FC<Props> = ({ notification }) => {
    return (
        <li
            className={`border-b px-4 py-3 text-sm ${
                notification.isRead ? "bg-gray-100" : "bg-white"
            }`}
        >
            <div className="flex justify-between gap-4">
                {/* Contenido del mensaje y fecha */}
                <div className="flex-1">
                    <p className="text-gray-800">{notification.message}</p>
                    <small className="text-gray-400">
                        {new Date(notification.createdAt).toLocaleString()}
                    </small>
                </div>

                <NotificationActions notification={notification} />
            </div>
        </li>
    );
};

export default NotificationItem;
