export type MissionStatus = 'En Proceso' | 'Retraso' | 'Fracaso' | 'Completada';
export type MissionPriority = 'Baja' | 'Media' | 'Alta' | 'Crítica';


export const MissionStatusValues = {
  EnProceso: 'En Proceso' as MissionStatus,
  Retraso: 'Retraso' as MissionStatus,
  Fracaso: 'Fracaso' as MissionStatus,
  Completada: 'Completada' as MissionStatus,
};


export const MissionPriorityValues = {
    Baja: 'Baja' as MissionPriority,
    Media: 'Media' as MissionPriority,
    Alta: 'Alta' as MissionPriority,
    Critica: 'Crítica' as MissionPriority,
}