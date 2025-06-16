import React from 'react';
import Button from '../../components/Button';
import MascaraAmbuInicio from '../../assets/logos/Logo prueba 4.png'; 
import RelojIcon from '../../assets/icons/chronometer-svgrepo-com.svg'; 
import whiteLogo from '../../assets/logos/logo_blanco.png';
import { useNavigate } from 'react-router-dom';

const AuthScreen: React.FC = () => {

  const navigate = useNavigate(); 

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row bg-black-anbu text-white">     

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl text-center font-bold text-red-anbu mb-2">
            ¡Bienvenido Agente!
          </h1>
          <p className="text-gray2-anbu text-center mb-6">
            Autenticación requerida. El silencio es lealtad.
          </p>

          <form className="space-y-4">
            <div className="flex items-center justify-center gap-2 mb-6">
              <img
                src={RelojIcon}
                alt="icon"
                className="h-6 w-6 object-contain"
                style={{ filter: 'invert(1)' }}    
              />
              <p className="text-gray2-anbu text-base">
                2 Minutos restantes
              </p>
            </div>

            <div>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 bg-gray3-anbu text-black rounded-md placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-antext-red-anbu"
                placeholder="Contraseña"
              />
            </div>

              <Button
                onClick={() =>  navigate('/homepage')}
                type="submit"
                color="bg-red-anbu hover:bg-yellow-anbu"
                textColor="text-white hover:text-black"
                iconRight={whiteLogo}
                className="w-full"
              >
                Enviar código de autenticación
              </Button>
          </form>
        </div>
      </div>

      <div className="flex justify-center items-center w-full md:w-1/2 p-6 md:p-8">
        <img
          src={MascaraAmbuInicio}
          alt="ANBU Logo"
          className="max-h-60 md:max-h-[80%] object-contain"
        />
      </div>
      
    </div>
  );
};

export default AuthScreen;
