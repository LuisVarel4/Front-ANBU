import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui";
import MascaraAmbuInicio from "../../assets/logos/Logo_mask_login.png";
import RelojIcon from "../../assets/icons/chronometer-svgrepo-com.svg";
import { useAuthContext } from "../../context/auth/context.ts";
import OtpInput from "../../components/ui/form/OtpInpu.tsx";

const OtpScreen: React.FC = () => {
  const [seconds, setSeconds] = useState(120);
  const [expired, setExpired] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const { completeLogin } = useAuthContext();

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setExpired(true);
    }
  }, [seconds]);

  const handleResend = () => {
    setSeconds(120);
    setExpired(false);
    setOtp("");
    setError("");
  };

  // Format mm:ss
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeString = `${minutes}:${secs.toString().padStart(2, "0")}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (expired) return;

    if (otp.length < 6) {
      setError("Debes ingresar el código completo.");
      return;
    }

    completeLogin(); // Aquí validarías con backend en un caso real
  };

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

          <form
            className="mb-6 flex flex-col items-center justify-center gap-2 space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center gap-2">
              <img
                src={RelojIcon}
                alt="icon"
                className="h-6 w-6 object-contain"
                style={{ filter: "invert(1)" }}
              />
              <p className="text-gray2-anbu text-base">
                {expired ? "El código ha expirado" : `${timeString} restantes`}
              </p>
            </div>

            <div>
              <OtpInput
                value={otp}
                onChange={setOtp}
                length={6}
                inputType="password" // Asegúrate de soportar esto
              />
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}

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

export default OtpScreen;
