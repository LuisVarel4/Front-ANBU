import React, { useState } from 'react';
import type { MissionStatus } from '../../Enums/MissionEnum';
import { MissionStatusValues } from '../../Enums/MissionEnum';

const EstadoDropdown: React.FC = () => {
  const [estado, setEstado] = useState<MissionStatus>(MissionStatusValues.EnProceso);

  const options: MissionStatus[] = [
    MissionStatusValues.EnProceso,
    MissionStatusValues.Retraso,
    MissionStatusValues.Fracaso,
    MissionStatusValues.Completada,
  ];

  return (
    <div>
      <label className="block font-medium mb-1">Estado</label>
      <select
        value={estado}
        onChange={(e) => setEstado(e.target.value as MissionStatus)}
        className="w-full rounded-md bg-gray-300 text-black px-4 py-2"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EstadoDropdown;
