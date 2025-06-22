import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import type { Notification } from "../../store/notifications/notifications.types";
import { useAppDispatch } from "../../store";
import { markAsRead, setDecisionStatus } from "../../store/notifications/slice";
import { FaRegCircleCheck } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";

type Props = {
    notification: Notification;
};

const NotificationActions: React.FC<Props> = ({ notification }) => {
    const dispatch = useAppDispatch();

    if (notification.type === "decision") {
        if (notification.decisionStatus) return null;
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
