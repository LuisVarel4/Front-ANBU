import React from 'react';
import type { MissionPriority, MissionStatus } from '../../Enums/MissionEnum';
import { MissionPriorityValues, MissionStatusValues } from '../../Enums/MissionEnum';

type LabelType = 'priority' | 'status';

interface Props {
  value: MissionPriority | MissionStatus;
  type: LabelType;
}

const getLabelStyles = (value: string, type: LabelType): string => {
  if (type === 'priority') {
    switch (value) {
      case MissionPriorityValues.Baja:
        return 'bg-gray3-anbu text-black-anbu';
      case MissionPriorityValues.Media:
        return 'bg-yellow-anbu text-black-anbu';
      case MissionPriorityValues.Alta:
        return 'bg-red-anbu text-white';
      case MissionPriorityValues.Critica:
        return 'bg-black-anbu text-white';
      default:
        return 'bg-gray2-anbu text-black-anbu';
    }
  }

  if (type === 'status') {
    switch (value) {
      case MissionStatusValues.EnProceso:
        return 'bg-gray2-anbu text-black-anbu';
      case MissionStatusValues.Retraso:
        return 'bg-yellow-anbu text-black-anbu';
      case MissionStatusValues.Fracaso:
        return 'bg-red-anbu text-white';
      case MissionStatusValues.Completada:
        return 'bg-green-anbu text-black-anbu';
      default:
        return 'bg-gray2-anbu text-black-anbu';
    }
  }

  return 'bg-gray2-anbu text-black-anbu';
};

const LabelTable: React.FC<Props> = ({ value, type }) => {
  const classes = getLabelStyles(value, type);
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${classes}`}>
      {value}
    </span>
  );
};

export default LabelTable;
