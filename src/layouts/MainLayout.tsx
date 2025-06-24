import { Outlet, useLocation } from "react-router-dom";
import Footer from "../features/Footer.tsx";
import Header from "../components/header/Header.tsx";
import { ScrollArea } from "../components/ui";

const MainLayout = () => {
  const location = useLocation();

  const [color, floating] = (() => {
    if (location.pathname.startsWith("/homepage"))
      return ["bg-transparent", true];
    return ["bg-red-anbu", false]; // color por defecto
  })();
  console.log(color, floating);
  return (
    <div className="flex h-full flex-col">
      <Header color={color} floating={floating} />
      <main className="flex-1 overflow-hidden">
        <ScrollArea autoScroll>
          <Outlet />
        </ScrollArea>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
