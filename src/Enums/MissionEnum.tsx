export type MissionStatus = 'en proceso' | 'retraso' | 'fracaso' | 'completada';
export type MissionPriority = 'baja' | 'media' | 'alta' | 'critica';


export const MissionStatusValues = {
  EnProceso: 'en proceso' as MissionStatus,
  Retraso: 'retraso' as MissionStatus,
  Fracaso: 'fracaso' as MissionStatus,
  Completada: 'completada' as MissionStatus,
};


export const MissionPriorityValues = {
  Baja: 'baja' as MissionPriority,
  Media: 'media' as MissionPriority,
  Alta: 'alta' as MissionPriority,
  Critica: 'critica' as MissionPriority,
}