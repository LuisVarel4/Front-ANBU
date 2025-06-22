import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef } from "react";
import iconoCampana from "../../assets/icons/campana.png";

type BellIconProps = {
    onClick?: () => void;
    unreadCount: number;
};

const BellIcon: React.FC<BellIconProps> = ({ onClick, unreadCount }) => {
    const controls = useAnimation();
    const prevCount = React.useRef(unreadCount);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio("/sounds/notification.wav");
        // Opcional: prevenir que se repita sobre sí mismo
        audioRef.current.preload = "auto";
    }, []);

    useEffect(() => {
        if (unreadCount > prevCount.current) {
            // Reproducir sonido
            audioRef.current?.play().catch((err) => {
                console.warn("No se pudo reproducir el sonido:", err);
            });

            // Ejecutar animación
            void controls.start({
                rotate: [0, -90, 90, -15, 15, 0],
                transition: { duration: 1 },
            });
        }
        prevCount.current = unreadCount;
    }, [unreadCount, controls]);

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
