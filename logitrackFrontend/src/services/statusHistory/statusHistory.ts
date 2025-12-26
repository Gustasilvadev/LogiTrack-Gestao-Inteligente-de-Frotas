import api from '@/src/services/api';
import { StatusHistoryResponse } from '@/src/types/statusHistory';

export const statusHistoryService = {

  // GET /api/vehicles/listVehicleById/{id}
  listByCarrier: async (idCarrier: number): Promise<StatusHistoryResponse[]> => {
    const { data } = await api.get<StatusHistoryResponse[]>(`/api/history/listHistoryByCarrier/${idCarrier}`);
    return data;
  },


  // DELETE /api/vehicles/deleteVehicleById/{id}
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/history/deleteHistoryById/${id}`);
  }
};