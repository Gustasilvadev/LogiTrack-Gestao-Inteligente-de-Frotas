export type RoleName = 'ADMIN' | 'MANAGER' | 'OPERADOR';
export type LogicalStatus = 'APAGADO' | 'INATIVO' | 'ATIVO';

export interface UserRequest {
  name:string;
  email: string;
  password:string;
  carrierCnpj:string;
  roleName:RoleName;
}

export interface UserResponse {
  id:number;
  name:string;
  email: string;
  roleName:string;
  carrierName:string;
  logicalStatus:LogicalStatus;

}