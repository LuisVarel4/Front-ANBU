import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import MascaraAmbuInicio from '../../assets/logos/Logo prueba 4.png'; 
import RelojIcon from '../../assets/icons/chronometer-svgrepo-com.svg'; 
import { useNavigate } from 'react-router-dom';

const OtpScreen: React.FC = () => {
  const navigate = useNavigate(); 

  const [seconds, setSeconds] = useState(120); // 2 minutes
  const [expired, setExpired] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setExpired(true);
    }
  }, [seconds]);

  const handleResend = () => {
    setSeconds(120);
    setExpired(false);
    setPassword('');
    setError('');
  };

  // Format mm:ss
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeString = `${minutes}:${secs.toString().padStart(2, '0')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (expired) return;
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    navigate('/homepage');
  };

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

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <img
                src={RelojIcon}
                alt="icon"
                className="h-6 w-6 object-contain"
                style={{ filter: 'invert(1)' }}    
              />
              <p className="text-gray2-anbu text-base">
                {expired ? 'El código ha expirado' : `${timeString} restantes`}
              </p>
            </div>

            <div>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 bg-gray3-anbu text-black rounded-md placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-anbu"
                placeholder="Contraseña"
                disabled={expired}
                value={password}
                onChange={e => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}

            {expired ? (
              <Button
                type="button"
                color="bg-red-anbu hover:bg-yellow-anbu"
                textColor="text-white hover:text-black"
                className="w-full"
                onClick={handleResend}
              >
                Reenviar código
              </Button>
            ) : (
              <Button
                type="submit"
                color="bg-red-anbu hover:bg-yellow-anbu"
                textColor="text-white hover:text-black"
                className="w-full"
              >
                Enviar código de autenticación
              </Button>
            )}
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

export default OtpScreen;
