export type LogicalStatus = 'APAGADO' | 'INATIVO' | 'ATIVO';

export interface CarrierRequest {
  name:string;
  cnpj:string;
}

export interface CarrierResponse {
  id:number;
  name:string;
  cnpj:string;
  logicalStatus:LogicalStatus;
}