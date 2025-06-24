import React, { useState } from "react";
import { Button } from "../../components/ui";
import MascaraAmbuInicio from "../../assets/logos/Logo_mask_login.png";
import { useNavigate } from "react-router-dom";

const AuthScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor ingresa un correo válido.");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    // If valid, navigate
    navigate("/otp");
  };

  return (
    <div className="bg-black-anbu flex min-h-screen flex-col-reverse text-white md:flex-row">
      <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2">
        <div className="w-full max-w-sm">
          <h1 className="text-red-anbu mb-2 text-center text-3xl font-bold">
            ¡Bienvenido Agente!
          </h1>
          <br />
          <p className="text-gray2-anbu mb-6 text-center">
            Autenticación requerida. El silencio es lealtad.
          </p>
          <br />

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                id="username"
                className="bg-gray3-anbu focus:ring-red-anbu w-full rounded-md px-4 py-2 text-black placeholder:text-gray-600 focus:ring-2 focus:outline-none"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                id="password"
                className="bg-gray3-anbu focus:ring-red-anbu w-full rounded-md px-4 py-2 text-black placeholder:text-gray-600 focus:ring-2 focus:outline-none"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}
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
