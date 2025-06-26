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
                notification.isRead ? "bg-gray2-anbu" : "bg-gray3-anbu"
            }`}
        >
            <div className="flex justify-between gap-4">
                <div className="flex-1">
                    <p className="text-gray1-anbu">{notification.message}</p>

                    {/* Estado de decisión */}
                    {notification.decisionStatus === "accepted" && (
                        <span className="text-xs text-green-anbu">
                            ✔ Aceptada
                        </span>
                    )}
                    {notification.decisionStatus === "rejected" && (
                        <span className="text-xs text-red-anbu">
                            ✘ Rechazada
                        </span>
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
