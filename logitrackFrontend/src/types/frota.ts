export type VeiculoStatus = 'DISPONIVEL' | 'EM_ROTA' | 'MANUTENCAO';

export interface Veiculo {
  id: string;
  placa: string;
  modelo: string;
  motorista: string;
  status: VeiculoStatus;
  capacidade: string;
  ultimaManutencao: string;
}