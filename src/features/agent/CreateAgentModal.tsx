import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import maskAnbu from "../../assets/ilustrations/Mascara_png-removebg-preview.png";
import Button from "../../components/ui/button/Button";
import Popup from "../../components/Popup";
import { userService } from "../../services/user/user.service";
import type { CreateUserRequest } from "../../services/user/user.service";

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateAgentModal({ isOpen, onClose }: CreateAgentModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    alias: "",
    email: "",
    password: "",
    role: "",
  });
  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const roles = ["agente", "kage", "traidor"];

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    const nuevosErrores: { [key: string]: string } = {};

    // Validate required fields
    if (!formData.fullName.trim()) {
      nuevosErrores.fullName = "El nombre completo es obligatorio";
    }
    if (!formData.alias.trim()) {
      nuevosErrores.alias = "El alias es obligatorio";
    }
    if (!formData.email.trim()) {
      nuevosErrores.email = "El email es obligatorio";
    }
    if (!formData.password.trim()) {
      nuevosErrores.password = "La contraseña es obligatoria";
    }
    if (!formData.role) {
      nuevosErrores.role = "El rol es obligatorio";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      nuevosErrores.email = "El email no tiene un formato válido";
    }

    // Enhanced password validation
    if (formData.password) {
      if (formData.password.length < 8) {
        nuevosErrores.password =
          "La contraseña debe tener al menos 8 caracteres";
      } else if (!/[a-zA-Z]/.test(formData.password)) {
        nuevosErrores.password =
          "La contraseña debe contener al menos una letra";
      } else if (!/[0-9]/.test(formData.password)) {
        nuevosErrores.password =
          "La contraseña debe contener al menos un número";
      }
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      try {
        setCreating(true);

        const userData: CreateUserRequest = {
          fullName: formData.fullName,
          alias: formData.alias,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        };

        await userService.createUser(userData);

        setModalVisible(true);
        setFormData({
          fullName: "",
          alias: "",
          email: "",
          password: "",
          role: "",
        });
      } catch (error: unknown) {
        // Manejo de errores por campo (adaptado a la estructura real)
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof (error as { response?: unknown }).response === "object" &&
          (error as { response?: { data?: unknown } }).response !== null &&
          Array.isArray(
            (error as { response: { data: { message?: unknown } } }).response
              .data.message,
          )
        ) {
          const fieldErrors: { [key: string]: string } = {};
          (
            error as {
              response: {
                data: { message: Array<{ field: string; error: string }> };
              };
            }
          ).response.data.message.forEach((err) => {
            fieldErrors[err.field] = err.error;
          });
          setErrores(fieldErrors);
        } else {
          setErrores({
            general: "Error al crear el usuario. Intenta de nuevo.",
          });
        }
      } finally {
        setCreating(false);
      }
    }
  };

  if (!isOpen) return null;

  type Campo = keyof typeof formData;

  return (
    <>
      {/* Background overlay with blur effect */}
      <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center overflow-auto p-4 backdrop-blur-sm">
        <div className="bg-grayBlue-anbu w-full max-w-3xl rounded-xl shadow-md">
          <form
            onSubmit={manejarEnvio}
            className="grid gap-6 p-6 md:grid-cols-2"
          >
            <div className="flex items-center justify-center">
              <img src={maskAnbu} alt="ANBU Mask" className="w-74" />
            </div>

            <div className="flex flex-col gap-4">
              {errores.general && (
                <div className="col-span-2 rounded bg-red-500 p-3 text-white">
                  {errores.general}
                </div>
              )}

              {(["fullName", "alias", "email", "password"] as Campo[]).map(
                (campo) => (
                  <div key={campo}>
                    <label className="mb-1 block text-white capitalize">
                      {campo === "fullName"
                        ? "Nombre Completo"
                        : campo === "email"
                          ? "Correo"
                          : campo === "password"
                            ? "Contraseña"
                            : campo}
                    </label>
                    <input
                      name={campo}
                      type={
                        campo === "email"
                          ? "email"
                          : campo === "password"
                            ? "password"
                            : "text"
                      }
                      value={formData[campo]}
                      onChange={manejarCambio}
                      className="text-black-anbu w-full rounded bg-gray-100 px-3 py-2"
                      placeholder={
                        campo === "password"
                          ? "Mínimo 8 caracteres, 1 letra y 1 número"
                          : ""
                      }
                    />
                    {errores[campo] && (
                      <p className="text-sm text-red-400">{errores[campo]}</p>
                    )}
                  </div>
                ),
              )}

              <div>
                <label className="mb-1 block text-white">Rol</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={manejarCambio}
                  className="text-black-anbu w-full rounded bg-gray-100 px-3 py-2"
                >
                  <option value="">Selecciona un rol</option>
                  {roles.map((rol) => (
                    <option key={rol} value={rol}>
                      {rol.charAt(0).toUpperCase() + rol.slice(1)}
                    </option>
                  ))}
                </select>
                {errores.role && (
                  <p className="text-sm text-red-400">{errores.role}</p>
                )}
              </div>
            </div>

            <div className="col-span-2 mt-4 flex justify-center gap-4">
              <Button
                onClick={onClose}
                type="button"
                color="bg-red-anbu"
                className="hover:bg-gray2-anbu"
                disabled={creating}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                color="bg-red-anbu"
                className="hover:bg-green-anbu"
                disabled={creating}
              >
                {creating ? "Creando..." : "Crear Agente"}
              </Button>
            </div>
          </form>
        </div>

        <Popup
          isOpen={modalVisible}
          onClose={() => {
            setModalVisible(false);
            navigate("/agent-list");
            onClose();
          }}
          message="¡Agente creado exitosamente!"
        />
      </div>
    </>
  );
}

export default CreateAgentModal;
