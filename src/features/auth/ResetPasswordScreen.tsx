import React, { useState } from "react";
import { Button } from "../../components/ui";
import MascaraAmbuInicio from "../../assets/logos/Logo_mask_login.png";
import { useNavigate } from "react-router-dom";

const ResetPasswordScreen: React.FC = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Restricciones
    if (newPassword.length < 8) {
      setError("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setError("La contraseña debe contener al menos una letra mayúscula.");
      return;
    }
    if (!/[^A-Za-z0-9]/.test(newPassword)) {
      setError("La contraseña debe contener al menos un símbolo.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Aquí iría la lógica para guardar la nueva contraseña
    setSuccess("¡Contraseña restablecida exitosamente!");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="bg-black-anbu flex min-h-screen flex-col-reverse text-white md:flex-row">
      <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2">
        <div className="w-full max-w-sm">
          <h1 className="text-red-anbu mb-2 text-center text-3xl font-bold">
            Restablecer contraseña
          </h1>
          <br />
          <p className="text-gray2-anbu mb-6 text-center">
            Ingresa tu nueva contraseña y confírmala.
          </p>
          <br />

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="password"
                id="new-password"
                className="bg-gray3-anbu focus:ring-red-anbu w-full rounded-md px-4 py-2 text-black placeholder:text-gray-600 focus:ring-2 focus:outline-none"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div>
              <input
                type="password"
                id="confirm-password"
                className="bg-gray3-anbu focus:ring-red-anbu w-full rounded-md px-4 py-2 text-black placeholder:text-gray-600 focus:ring-2 focus:outline-none"
                placeholder="Confirmar nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}
            {success && <div className="text-sm text-green-500">{success}</div>}
            <Button
              type="submit"
              color="bg-red-anbu hover:bg-yellow-anbu"
              textColor="text-white hover:text-black"
              className="w-full"
            >
              Establecer nueva contraseña
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

export default ResetPasswordScreen;
