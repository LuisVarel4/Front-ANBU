// src/features/agent/EditAgentModal.tsx
import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui";
import maskAnbu from "../../assets/ilustrations/Mascara_png-removebg-preview.png";
import Popup from "../../components/Popup";
import { userService } from "../../services/user/user.service";
import type { UpdateUserRequest } from "../../services/user/user.service";

interface EditAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: {
    id: string;
    fullName: string;
    alias: string;
    email: string;
    role: string;
  } | null;
  onSave: (updatedAgent: any) => void;
}

const EditAgentModal: React.FC<EditAgentModalProps> = ({
  isOpen,
  onClose,
  agent,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    alias: "",
    email: "",
    password: "",
    role: "",
  });

  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [updating, setUpdating] = useState(false);

  const roles = ["agente", "kage", "traidor"];

  useEffect(() => {
    if (agent) {
      setFormData({
        fullName: agent.fullName,
        alias: agent.alias,
        email: agent.email,
        password: "",
        role: agent.role,
      });
    }
  }, [agent]);

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    if (!formData.role) {
      nuevosErrores.role = "El rol es obligatorio";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      nuevosErrores.email = "El email no tiene un formato válido";
    }

    // Password validation (only if provided)
    if (formData.password && formData.password.length < 8) {
      nuevosErrores.password = "La contraseña debe tener al menos 8 caracteres";
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0 && agent) {
      try {
        setUpdating(true);

        const updateData: UpdateUserRequest = {
          fullName: formData.fullName,
          alias: formData.alias,
          email: formData.email,
          role: formData.role,
          active: true,
        };

        // Only include password if it's provided
        if (formData.password.trim()) {
          updateData.password = formData.password;
        }

        const updatedUser = await userService.updateUser(agent.id, updateData);
        
        // Update the local state
        onSave({
          id: agent.id,
          fullName: updatedUser.fullName,
          alias: updatedUser.alias,
          email: updatedUser.email,
          role: updatedUser.role,
        });

        setModalVisible(true);
      } catch (error) {
        console.error('Error updating user:', error);
        setErrores({ general: "Error al actualizar el usuario. Intenta de nuevo." });
      } finally {
        setUpdating(false);
      }
    }
  };

  if (!isOpen || !agent) return null;

  type Campo = keyof typeof formData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto p-4 bg-opacity-50">
      <div className="bg-grayBlue-anbu w-full max-w-3xl rounded-xl shadow-md">
        <form onSubmit={manejarEnvio} className="grid gap-6 p-6 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img src={maskAnbu} alt="ANBU Mask" className="w-60" />
          </div>

          <div className="flex flex-col gap-4">
            {errores.general && (
              <div className="col-span-2 p-3 bg-red-500 text-white rounded">
                {errores.general}
              </div>
            )}

            {(["fullName", "alias", "email", "password"] as Campo[]).map(
              (campo) => (
                <div key={campo}>
                  <label className="mb-1 block capitalize text-white">
                    {campo === "fullName" ? "Nombre Completo" :
                     campo === "email" ? "Correo" :
                     campo === "password" ? "Contraseña (opcional)" :
                     campo}
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
                    placeholder={campo === "password" ? "Dejar vacío para mantener actual" : ""}
                    className="text-black-anbu w-full rounded bg-gray-100 px-3 py-2"
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
              disabled={updating}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              color="bg-red-anbu"
              className="hover:bg-green-anbu"
              disabled={updating}
            >
              {updating ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </div>

      <Popup
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false);
          onClose();
        }}
        message="¡Usuario actualizado exitosamente!"
      />
    </div>
  );
};

export default EditAgentModal;
