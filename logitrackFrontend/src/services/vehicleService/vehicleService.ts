import api from '@/src/services/api';
import { VehicleRequest, VehicleResponse, StatusVehicle } from '@/src/types/vehicle';

export const vehicleService = {

  // GET /api/vehicles/listVehicles
  listAll: async (): Promise<VehicleResponse[]> => {
    const { data } = await api.get<VehicleResponse[]>('/api/vehicles/listVehicles');
    return data;
  },

  // POST /api/vehicles/createVehicle
  create: async (vehicle: VehicleRequest): Promise<VehicleResponse> => {
    const { data } = await api.post<VehicleResponse>('/api/vehicles/createVehicle', vehicle);
    return data;
  },

  // GET /api/vehicles/listVehicleById/{id}
  getById: async (id: number): Promise<VehicleResponse> => {
    const { data } = await api.get<VehicleResponse>(`/api/vehicles/listVehicleById/${id}`);
    return data;
  },

  // PUT /api/vehicles/updateVehicleStatusById/{id}
  updateStatusVehicle: async (id: number, status: StatusVehicle): Promise<VehicleResponse> => {
    const { data } = await api.put<VehicleResponse>(`/api/vehicles/updateVehicleStatusById/${id}`, { status });
    return data;
  },

  // DELETE /api/vehicles/deleteVehicleById/{id}
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/vehicles/deleteVehicleById/${id}`);
  },
  //Patch /api/carriers/{id}/status
  updateStatusLogical: async (id: number, status: string): Promise<void> => {
    await api.patch(`/api/users/${id}/status?status=${status}`);
  }
};