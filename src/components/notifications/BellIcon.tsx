import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef } from "react";
import iconoCampana from "../../assets/icons/campana.png";
import useNotificationSound from "./UseNotificationSound.tsx";

type BellIconProps = {
    onClick?: () => void;
    unreadCount: number;
};

const BellIcon: React.FC<BellIconProps> = ({ onClick, unreadCount }) => {
    const controls = useAnimation();
    const prevCount = useRef(unreadCount);

    const playNotificationSound = useNotificationSound();

    useEffect(() => {
        if (unreadCount > prevCount.current) {
            // Reproducir sonido
            playNotificationSound();

            // Ejecutar animación
            void controls.start({
                rotate: [0, -90, 90, -15, 15, 0],
                transition: { duration: 1 },
            });
        }
        prevCount.current = unreadCount;
    }, [unreadCount, controls, playNotificationSound]);

    return (
        <div className="group cursor-pointer md:block" onClick={onClick}>
            <motion.img
                src={iconoCampana}
                alt="Campana"
                animate={controls}
                // className="h-8 w-8 origin-top transition-transform duration-200 ease-in-out group-hover:scale-105 group-hover:rotate-6"
                className="h-35 origin-top transition-transform duration-200 ease-in-out group-hover:scale-105 group-hover:rotate-6"
            />
        </div>
    );
};

export default BellIcon;
