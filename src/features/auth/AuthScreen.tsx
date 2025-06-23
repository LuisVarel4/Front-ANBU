import React, { useState } from 'react';
import Button from '../../components/Button';
import MascaraAmbuInicio from '../../assets/logos/Logo prueba 4.png'; 
import { useNavigate } from 'react-router-dom';

const AuthScreen: React.FC = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un correo válido.');
      return;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    // If valid, navigate
    navigate('/otp');
  };

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row bg-black-anbu text-white">     
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl text-center font-bold text-red-anbu mb-2">
            ¡Bienvenido Agente!
          </h1>
          <br />
          <p className="text-gray2-anbu text-center mb-6">
            Autenticación requerida. El silencio es lealtad.
          </p>
          <br />

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                id="username"
                className="w-full px-4 py-2 bg-gray3-anbu text-black rounded-md placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-anbu"
                placeholder="Correo electrónico"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 bg-gray3-anbu text-black rounded-md placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-anbu"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button
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
