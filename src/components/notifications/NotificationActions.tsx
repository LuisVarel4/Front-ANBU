import React from "react";
import CancelIcon from "../../assets/icons/cancel-svgrepo-com.svg?react";
import CheckIcon from "../../assets/icons/check-circle-svgrepo-com.svg?react";
import { AiOutlineEye } from "react-icons/ai";
import type { Notification } from "../../store/notifications/notifications.types";
import { useAppDispatch } from "../../store";
import { markAsRead } from "../../store/notifications/slice";

type Props = {
    notification: Notification;
};

const NotificationActions: React.FC<Props> = ({ notification }) => {
    const dispatch = useAppDispatch();

    if (notification.type === "decision") {
        return (
            <div className="ml-2 flex items-center gap-2">
                <button>
                    <CheckIcon className="text-green-anbu h-5 w-5 cursor-pointer" />
                </button>
                <button>
                    <CancelIcon className="text-red-anbu h-5 w-5 cursor-pointer" />
                </button>
            </div>
        );
    }

    if (!notification.isRead) {
        return (
            <div className="ml-2 flex items-center">
                <button
                    onClick={() => dispatch(markAsRead(notification.id))}
                    title="Marcar como leída"
                >
                    <AiOutlineEye className="h-5 w-5 cursor-pointer text-blue-500 hover:text-blue-700" />
                </button>
            </div>
        );
    }

    return null;
};

export default NotificationActions;
