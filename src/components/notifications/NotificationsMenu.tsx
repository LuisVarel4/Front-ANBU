import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Notification } from "../../store/notifications/notifications.types";
import NotificationList from "./NotificationList";
import { IoMdClose } from "react-icons/io";

type Props = {
    notifications: Notification[];
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    panelRef: React.RefObject<HTMLDivElement | null>;
};

const NotificationsMenu: React.FC<Props> = ({
    notifications,
    isOpen,
    setIsOpen,
    panelRef,
}) => {
    useEffect(() => {
        const target = document.documentElement; // <html>

        if (isOpen && window.innerWidth < 640) {
            target.style.overflow = "hidden";
        } else {
            target.style.overflow = "";
        }

        return () => {
            target.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Mobile */}
                    <motion.div
                        className="fixed inset-0 z-50 flex flex-col overflow-auto bg-white sm:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="flex items-center justify-between border-b p-4 font-bold text-gray-700">
                            Notificaciones
                            <IoMdClose
                                className="text-red-anbu cursor-pointer text-2xl"
                                onClick={() => setIsOpen(false)}
                                title="Cerrar"
                            />
                        </div>
                        <NotificationList notifications={notifications} />
                    </motion.div>

                    {/* Desktop */}
                    <motion.div
                        ref={panelRef}
                        className="absolute top-0 right-full z-50 mt-2 hidden max-h-96 w-80 overflow-auto rounded-lg border bg-white shadow-xl sm:block"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="border-b p-4 font-bold text-gray-700">
                            Notificaciones
                        </div>
                        <NotificationList notifications={notifications} />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default NotificationsMenu;
