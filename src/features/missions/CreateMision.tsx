import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/Popup";
import { MissionPriorityValues } from "../../Enums/MissionEnum";
import { userService } from "../../services/user/user.service";
import { missionService } from "../../services/mission/mission.service";
import type { APIUser } from "../../services/user/user.service";
import type { CreateMissionRequest } from "../../services/mission/mission.service";

const CreateMissionForm: React.FC = () => {
  const navigate = useNavigate();
  const [alias, setAlias] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [capitan, setCapitan] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  
  const [users, setUsers] = useState<APIUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [creating, setCreating] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const userData = await userService.getUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // Validation functions based on backend DTO
  const validateCodeName = (value: string): string => {
    if (!value.trim()) {
      return "El código de la misión es requerido";
    }
    if (value.length < 3) {
      return "El código de la misión debe tener al menos 3 caracteres";
    }
    if (value.length > 255) {
      return "El código de la misión no puede exceder los 255 caracteres";
    }
    if (!/^[\p{L}\p{N}\s\-_]+$/u.test(value)) {
      return "El código de la misión solo puede contener letras, números, espacios, guiones y guiones bajos";
    }
    return "";
  };

  const validateObjective = (value: string): string => {
    if (!value.trim()) {
      return "El objetivo es requerido";
    }
    if (value.length < 10) {
      return "El objetivo debe tener al menos 10 caracteres";
    }
    if (value.length > 255) {
      return "El objetivo no puede exceder los 255 caracteres";
    }
    if (!/^[\p{L}\p{N}\s.,!?:;"()\-_/]+$/u.test(value)) {
      return "El objetivo solo puede contener letras, números, espacios y algunos símbolos";
    }
    return "";
  };

  const validateDescription = (value: string): string => {
    if (!value.trim()) {
      return "La descripción es requerida";
    }
    if (value.length < 20) {
      return "La descripción debe tener al menos 20 caracteres";
    }
    if (value.length > 2000) {
      return "La descripción no puede exceder los 2000 caracteres";
    }
    return "";
  };

  const validateCaptain = (value: string): string => {
    if (!value) {
      return "Debe seleccionar un capitán";
    }
    // UUID v4 validation
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      return "El ID del capitán debe ser un UUID válido";
    }
    return "";
  };

  const validatePriority = (value: string): string => {
    if (!value) {
      return "Debe seleccionar una prioridad";
    }
    const validPriorities = Object.values(MissionPriorityValues);
    if (!validPriorities.includes(value as any)) {
      return `La prioridad debe ser una de las siguientes: ${validPriorities.join(', ')}`;
    }
    return "";
  };

  const validateDeadline = (value: string): string => {
    if (!value) {
      return "La fecha límite es requerida";
    }
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return "La fecha límite no puede ser en el pasado";
    }
    return "";
  };

  // Handle input changes with real-time validation
  const handleAliasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAlias(value);
    const error = validateCodeName(value);
    setErrors(prev => ({ ...prev, alias: error }));
  };

  const handleObjetivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setObjetivo(value);
    const error = validateObjective(value);
    setErrors(prev => ({ ...prev, objetivo: error }));
  };

  const handleDescripcionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescripcion(value);
    const error = validateDescription(value);
    setErrors(prev => ({ ...prev, descripcion: error }));
  };

  const handleCapitanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCapitan(value);
    const error = validateCaptain(value);
    setErrors(prev => ({ ...prev, capitan: error }));
  };

  const handlePrioridadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPrioridad(value);
    const error = validatePriority(value);
    setErrors(prev => ({ ...prev, prioridad: error }));
  };

  const handleFechaLimiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFechaLimite(value);
    const error = validateDeadline(value);
    setErrors(prev => ({ ...prev, fechaLimite: error }));
  };

  const handleSubmit = async () => {
    console.log('Starting form submission...'); // Debug log
    
    // Validate all fields
    const newErrors: { [key: string]: string } = {};
    
    newErrors.alias = validateCodeName(alias);
    newErrors.objetivo = validateObjective(objetivo);
    newErrors.descripcion = validateDescription(descripcion);
    newErrors.capitan = validateCaptain(capitan);
    newErrors.prioridad = validatePriority(prioridad);
    newErrors.fechaLimite = validateDeadline(fechaLimite);

    // Remove empty errors
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) delete newErrors[key];
    });

    console.log('Validation errors:', newErrors); // Debug log

    setErrors(newErrors);

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      console.log('Form has errors, not submitting');
      return;
    }

    try {
      setCreating(true);
      console.log('Creating mission...'); // Debug log

      // Format the deadline to ISO string
      const deadlineISO = new Date(fechaLimite + 'T23:59:00.000Z').toISOString();
      
      console.log('Formatted deadline:', deadlineISO); // Debug log

      const missionData: CreateMissionRequest = {
        codeName: alias,
        objective: objetivo,
        description: descripcion,
        captain_id: capitan,
        priority: prioridad,
        deadline: deadlineISO,
        status: "en proceso",
        assignedAgents: [] 
      };

      console.log('Mission data to send:', missionData); // Debug log

      const result = await missionService.createMission(missionData);
      console.log('Mission created successfully:', result); // Debug log
      
      // Clear form
      setAlias("");
      setObjetivo("");
      setDescripcion("");
      setCapitan("");
      setPrioridad("");
      setFechaLimite("");
      setErrors({});
      
      setPopupOpen(true);

    } catch (error: any) {
      console.error('Error creating mission:', error);
      console.error('Error response:', error.response?.data); // Debug log
      console.error('Error status:', error.response?.status); // Debug log
      
      // More specific error handling
      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else if (error.response?.status === 400) {
        setErrors({ general: "Datos inválidos. Por favor verifica los campos." });
      } else if (error.response?.status === 401) {
        setErrors({ general: "No tienes autorización para crear misiones." });
      } else if (error.response?.status >= 500) {
        setErrors({ general: "Error del servidor. Intenta más tarde." });
      } else {
        setErrors({ general: "Error al crear la misión. Por favor, intenta de nuevo." });
      }
    } finally {
      setCreating(false);
    }
  };

  // Get eligible captains
  const eligibleCaptains = users.filter(user => 
    user.role === 'agente' || user.role === 'kage'
  );

  return (
    <div className="bg-black-anbu min-h-screen text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="text-red-anbu mb-6 text-2xl font-bold">Crear Misión</h2>

        {errors.general && (
          <div className="mb-4 p-4 bg-red-500 text-white rounded-md">
            {errors.general}
            <button 
              onClick={() => setErrors(prev => ({ ...prev, general: "" }))}
              className="ml-2 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="mb-1 block font-medium">
                Código de Misión *
                <span className="text-xs text-gray-400 ml-2">
                  (3-255 caracteres, solo letras, números, espacios, guiones)
                </span>
              </label>
              <input
                type="text"
                value={alias}
                onChange={handleAliasChange}
                className={`w-full rounded-md px-4 py-2 text-black ${
                  errors.alias ? "bg-red-100 border-red-500" : "bg-gray-300"
                }`}
                placeholder="Ej: MISION-ALFA-2025"
                maxLength={255}
              />
              {errors.alias && (
                <p className="text-red-400 text-sm mt-1">{errors.alias}</p>
              )}
              <p className="text-gray-400 text-xs mt-1">
                {alias.length}/255 caracteres
              </p>
            </div>

            <div>
              <label className="mb-1 block font-medium">
                Objetivo *
                <span className="text-xs text-gray-400 ml-2">
                  (10-255 caracteres)
                </span>
              </label>
              <input
                type="text"
                value={objetivo}
                onChange={handleObjetivoChange}
                className={`w-full rounded-md px-4 py-2 text-black ${
                  errors.objetivo ? "bg-red-100 border-red-500" : "bg-gray-300"
                }`}
                placeholder="Descripción del objetivo principal"
                maxLength={255}
              />
              {errors.objetivo && (
                <p className="text-red-400 text-sm mt-1">{errors.objetivo}</p>
              )}
              <p className="text-gray-400 text-xs mt-1">
                {objetivo.length}/255 caracteres
              </p>
            </div>

            <div>
              <label className="mb-1 block font-medium">
                Descripción *
                <span className="text-xs text-gray-400 ml-2">
                  (20-2000 caracteres)
                </span>
              </label>
              <textarea
                value={descripcion}
                onChange={handleDescripcionChange}
                className={`h-28 w-full resize-none rounded-md px-4 py-2 text-black ${
                  errors.descripcion ? "bg-red-100 border-red-500" : "bg-gray-300"
                }`}
                placeholder="Descripción detallada de la misión"
                maxLength={2000}
              />
              {errors.descripcion && (
                <p className="text-red-400 text-sm mt-1">{errors.descripcion}</p>
              )}
              <p className="text-gray-400 text-xs mt-1">
                {descripcion.length}/2000 caracteres
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="mb-1 block font-medium">Capitán designado *</label>
              <select
                value={capitan}
                onChange={handleCapitanChange}
                className={`w-full rounded-md px-4 py-2 text-black ${
                  errors.capitan ? "bg-red-100 border-red-500" : "bg-gray-300"
                }`}
                disabled={loadingUsers}
              >
                <option value="">
                  {loadingUsers ? "Cargando capitanes..." : "Selecciona un capitán"}
                </option>
                {eligibleCaptains.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.alias} - {user.fullName}
                  </option>
                ))}
              </select>
              {errors.capitan && (
                <p className="text-red-400 text-sm mt-1">{errors.capitan}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block font-medium">Nivel de Prioridad *</label>
              <select
                value={prioridad}
                onChange={handlePrioridadChange}
                className={`w-full rounded-md px-4 py-2 text-black ${
                  errors.prioridad ? "bg-red-100 border-red-500" : "bg-gray-300"
                }`}
              >
                <option value="">Selecciona prioridad</option>
                <option value={MissionPriorityValues.Baja}>{MissionPriorityValues.Baja}</option>
                <option value={MissionPriorityValues.Media}>{MissionPriorityValues.Media}</option>
                <option value={MissionPriorityValues.Alta}>{MissionPriorityValues.Alta}</option>
                <option value={MissionPriorityValues.Critica}>{MissionPriorityValues.Critica}</option>
              </select>
              {errors.prioridad && (
                <p className="text-red-400 text-sm mt-1">{errors.prioridad}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block font-medium">Fecha Límite *</label>
              <input
                type="date"
                value={fechaLimite}
                onChange={handleFechaLimiteChange}
                className={`w-full rounded-md px-4 py-2 text-black ${
                  errors.fechaLimite ? "bg-red-100 border-red-500" : "bg-gray-300"
                }`}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.fechaLimite && (
                <p className="text-red-400 text-sm mt-1">{errors.fechaLimite}</p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          <Button
            type="button"
            color="bg-red-anbu hover:bg-yellow-anbu"
            textColor="text-white hover:text-black"
            onClick={() => navigate(-1)}
            disabled={creating}
          >
            Volver
          </Button>

          <Button
            type="button"
            color="bg-red-anbu hover:bg-yellow-anbu"
            textColor="text-white hover:text-black"
            onClick={handleSubmit}
            disabled={creating}
          >
            {creating ? "Creando..." : "Crear Misión"}
          </Button>
        </div>

        <Popup
          isOpen={popupOpen}
          onClose={() => {
            setPopupOpen(false);
            navigate(-1);
          }}
          message="¡Misión creada exitosamente!"
        />
      </div>
    </div>
  );
};

export default CreateMissionForm;
