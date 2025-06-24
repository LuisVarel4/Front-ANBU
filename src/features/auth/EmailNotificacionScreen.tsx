import React from "react";
import MascaraAmbuInicio from "../../assets/logos/Logo_mask_login.png";
import { useNavigate } from "react-router-dom";

const EmailNotificationScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black-anbu flex min-h-screen flex-col-reverse text-white md:flex-row">
      <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2">
        <div className="w-full max-w-sm">
          <h1 className="text-red-anbu mb-2 text-center text-3xl font-bold">
            Revisa tu correo
          </h1>
          <br />
          <p className="text-gray2-anbu mb-6 text-center">
            Te hemos enviado un enlace para restablecer tu contraseña.<br />
            Por favor, revisa tu correo electrónico y sigue las instrucciones para continuar.
          </p>
          <br />
          <button
            className="w-full bg-red-anbu hover:bg-yellow-anbu text-white hover:text-black font-semibold rounded-md px-4 py-2 transition"
            onClick={() => navigate("/auth")}
          >
            Volver al inicio de sesión
          </button>
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

export default EmailNotificationScreen;