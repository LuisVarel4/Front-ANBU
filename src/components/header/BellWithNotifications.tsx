import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BellIcon from "../notifications/BellIcon.tsx";
import NotificationsMenu from "../notifications/NotificationsMenu.tsx";
import type { RootState } from "../../store";

const BellWithNotifications: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const unreadCount = useSelector(
        (state: RootState) =>
            state.notifications.list.filter((n) => !n.isRead).length,
    );
    const notifications = useSelector(
        (state: RootState) => state.notifications.list,
    );

    // Cierra el panel si clic fuera
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(e.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <div className="absolute top-2 right-5">
            <div className="relative" ref={buttonRef}>
                <BellIcon
                    onClick={() => setIsOpen((prev) => !prev)}
                    unreadCount={unreadCount}
                />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 rounded-full bg-red-600 px-1 text-xs text-white">
                        {unreadCount}
                    </span>
                )}
                <NotificationsMenu
                    notifications={notifications}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    panelRef={panelRef}
                />
            </div>
        </div>
    );
};

export default BellWithNotifications;
