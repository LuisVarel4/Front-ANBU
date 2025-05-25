import React from 'react';
import Button from '../../components/Button';

const AuthScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">¡Bienvenido Agente!</h1>
        <p className="text-center mb-8">Autenticación requerida. El aliento es lealtad.</p>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">Usuario</label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingrese su usuario"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingrese su contraseña"
            />
          </div>
          
         <Button type="submit" className="w-full">
            Enviar código de autenticación
         </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthScreen;