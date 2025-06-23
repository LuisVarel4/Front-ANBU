import React from "react";
import { Button } from "../../components/ui";
import MascaraAmbuInicio from "../../assets/logos/Logo prueba 4.png";
import RelojIcon from "../../assets/icons/chronometer-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

const AuthScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black-anbu flex min-h-screen flex-col-reverse text-white md:flex-row">
      <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2">
        <div className="w-full max-w-sm">
          <h1 className="text-red-anbu mb-2 text-center text-3xl font-bold">
            ¡Bienvenido Agente!
          </h1>
          <p className="text-gray2-anbu mb-6 text-center">
            Autenticación requerida. El silencio es lealtad.
          </p>

          <form className="space-y-4">
            <div className="mb-6 flex items-center justify-center gap-2">
              <img
                src={RelojIcon}
                alt="icon"
                className="h-6 w-6 object-contain"
                style={{ filter: "invert(1)" }}
              />
              <p className="text-gray2-anbu text-base">2 Minutos restantes</p>
            </div>

            <div>
              <input
                type="password"
                id="password"
                className="bg-gray3-anbu focus:ring-red-antext-red-anbu w-full rounded-md px-4 py-2 text-black placeholder:text-gray-600 focus:ring-2 focus:outline-none"
                placeholder="Contraseña"
              />
            </div>

            <Button
              onClick={() => navigate("/homepage")}
              type="submit"
              color="bg-red-anbu hover:bg-yellow-anbu"
              textColor="text-white hover:text-black"
              className="w-full"
            >
              Enviar código de autenticación
            </Button>
          </form>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-6 md:w-1/2 md:p-8">
        <img
          src={MascaraAmbuInicio}
          alt="ANBU Logo"
          className="max-h-60 object-contain md:max-h-[80%]"
        />
      </div>
    </div>
  );
};

export default AuthScreen;
