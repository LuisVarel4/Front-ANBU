import { io, Socket } from 'socket.io-client';

const formatNamespace = (ns: string) => (ns.startsWith('/') ? ns : `/${ns}`);


const sockets: Record<string, Socket> = {};
const apiUrl = import.meta.env.VITE_API_URL;
/**
 * Crea una instancia de socket.io-client para el namespace dado.
 * @param namespace Ej: '/chat', '/notifications'
 */
export const createSocket = (namespace: string): Socket => {
  const ns = formatNamespace(namespace);

  if (!sockets[ns]) {
    sockets[ns] = io(`${apiUrl}${ns}`, {
      withCredentials: true,
      transports: ['websocket', 'polling'], // Agregar polling para debug
      forceNew: true, // Forzar nueva conexión
      reconnection: true,
      timeout: 20000,
    });
  }
  return sockets[ns];
};
