import React from "react";
import type { Notification } from "../../store/notifications/notifications.types";
import NotificationItem from "./NotificationItem";

type Props = {
    notifications: Notification[];
};

const NotificationList: React.FC<Props> = ({ notifications }) => {
    if (notifications.length === 0) {
        return (
            <div className="p-4 text-sm text-gray-500">
                No tienes notificaciones.
            </div>
        );
    }

    return (
        <ul>
            {notifications.map((n) => (
                <NotificationItem key={n.id} notification={n} />
            ))}
        </ul>
    );
};

export default NotificationList;
