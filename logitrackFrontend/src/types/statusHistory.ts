export type StatusVehicle = 'DISPONIVEL' | 'EM_ROTA' | 'MANUTENCAO';

interface StatusHistoryResponse {
  id:number;
  historyPrevious:StatusVehicle;
  historyNew:StatusVehicle;
  date:Date;
  userName:string;
  vehiclePlate:string;
}