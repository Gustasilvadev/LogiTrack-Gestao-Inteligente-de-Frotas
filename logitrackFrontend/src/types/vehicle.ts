export type StatusVehicle = 'DISPONIVEL' | 'EM_ROTA' | 'MANUTENCAO';
export type LogicalStatus = 'APAGADO' | 'INATIVO' | 'ATIVO';

export interface VehicleResponse {
  id: string;
  plate: string;
  model: string;
  capacity: string;
  driverName:string;
  statusVehicle: StatusVehicle;
  logicalStatus: LogicalStatus;
}

export interface VehicleRequest {
  plate: string;
  model: string;
  capacity: string;
  driverName:string;
  statusVehicle: StatusVehicle;
}