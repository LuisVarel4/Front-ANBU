import { Outlet, useLocation } from "react-router-dom";
import Footer from "../features/Footer.tsx";
import Header from "../components/header/Header.tsx";


const MainLayout = () => {
  const location = useLocation();   
  const backgroundImage = "/arches.png";

  const [color, floating, overflowHidden] = (() => {
    if (location.pathname.startsWith("/homepage"))
      return ["bg-transparent", true, false];
    return [`bg-red-anbu bg-[url('${backgroundImage}')] bg-repeat`, false, false];
  })();
  return (
    <div className="flex h-full flex-col">
      <Header color={color} floating={floating} />
      <main className={`${overflowHidden ? "overflow-hidden" : ""} flex-1`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
