import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BellIcon from '../notifications/BellIcon.tsx';
import NotificationsMenu from '../notifications/NotificationsMenu.tsx';
import type { AppDispatch, RootState } from '../../store';
import { Badge } from '../ui';
import { notificationsService } from '../../services/notifications/notifications.service.ts';
import { setNotifications } from '../../store/notifications/slice.tsx';

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
  const dispatch = useDispatch<AppDispatch>();

  // ✅ 2. Carga inicial de notificaciones
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationsService.getAll();
        dispatch(setNotifications(data));
      } catch (error) {
        console.error('❌ Error al cargar notificaciones:', error);
      }
    };

    fetchNotifications();
  }, [dispatch]);


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
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="absolute top-0 right-0">
      <div className="relative" ref={buttonRef}>
        <BellIcon
          onClick={() => setIsOpen((prev) => !prev)}
          unreadCount={unreadCount}
        />
        {unreadCount > 0 && (
          <Badge className="bg-grayBlue-anbu" floating rounded>
            {unreadCount}
          </Badge>
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
