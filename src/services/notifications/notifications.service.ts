import api from '../../api/axios.config.ts';
import type { Notification } from '../../store/notifications/notifications.types';

export class NotificationsService {
  /**
   * Obtener todas las notificaciones del usuario autenticado
   */
  async getAll(): Promise<Notification[]> {
    const response = await api.get<Notification[]>('/notifications', {
      withCredentials: true,
    });
    return response.data;
  }

  /**
   * Marcar una notificación como leída
   */
  async markAsRead(id: string): Promise<void> {
    await api.patch(`/notifications/${id}/read`, null, {
      withCredentials: true,
    });
  }

  /**
   * Marcar todas como leídas
   */
  async markAllAsRead(): Promise<void> {
    await api.patch(`/notifications/read-all`, null, {
      withCredentials: true,
    });
  }

  /**
   * Actualizar el estado de decisión (accepted | rejected)
   */
  async updateDecisionStatus(id: string, status: 'accepted' | 'rejected'): Promise<void> {
    await api.patch(`/notifications/${id}/decision`, { status }, {
      withCredentials: true,
    });
  }

  /**
   * Eliminar una notificación
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/notifications/${id}`, {
      withCredentials: true,
    });
  }
}

export const notificationsService = new NotificationsService();
