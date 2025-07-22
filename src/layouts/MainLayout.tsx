import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../features/Footer.tsx';
import Header from '../components/header/Header.tsx';
import { useNotificationsSocket } from '../hooks/useNotificationsSocket.ts';
import { useAuthContext } from '../context/auth/context.ts';


const MainLayout = () => {
  const location = useLocation();
  const { user, isLoading } = useAuthContext();

  console.log('user', user);
  // ✅ 1. Escucha de socket
  useNotificationsSocket(Boolean(user) && !isLoading);


  const [color, floating, overflowHidden] = (() => {
    if (location.pathname.startsWith('/homepage'))
      return ['bg-transparent', true, false];
    return [`bg-red-anbu bg-[url('/arches.png')] bg-repeat`, false, false];
  })();
  return (
    <div className="flex h-full flex-col">
      <Header color={color} floating={floating} />
      <main className={`${overflowHidden ? 'overflow-hidden' : ''} flex-1`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
