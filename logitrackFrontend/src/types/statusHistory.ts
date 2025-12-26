export type StatusVehicle = 'DISPONIVEL' | 'EM_ROTA' | 'MANUTENCAO';

export interface StatusHistoryResponse {
  id:number;
  historyPrevious:StatusVehicle;
  historyNew:StatusVehicle;
  date: string;
  userName:string;
  vehiclePlate:string;
}