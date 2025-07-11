import { useEffect, useRef } from "react";

const useNotificationSound = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio("/sounds/notification.wav");
        audio.preload = "auto";
        audio.volume = 0.1; // Adjusted volume
        audioRef.current = audio;
    }, []);

    return () => {
        if (audioRef.current) {
            try {
                audioRef.current.currentTime = 0; // Restart the audio
                audioRef.current.play().catch((err) => {
                    console.warn("No se pudo reproducir el sonido:", err);
                });
            } catch (err) {
                console.warn("Error al reproducir el sonido:", err);
            }
        }
    };
};

export default useNotificationSound;
