import api from '@/src/services/api';
import { CarrierRequest, CarrierResponse } from '@/src/types/carrier';

export const carrierService ={

  // GET /api/carriers/listCarrierActive
  listAllActive: async (): Promise<CarrierResponse[]> => {
    const { data } = await api.get<CarrierResponse[]>('/api/carriers/listCarrierActive');
    return data;
  },

  // GET /api/carriers/listCarrier
  listAll: async (): Promise<CarrierResponse[]> => {
    const { data } = await api.get<CarrierResponse[]>('/api/carriers/listCarrier');
    return data;
  },

  // GET /api/carriers/listCarrierById/{id}
  getById: async (id: number): Promise<CarrierResponse> => {
    const { data } = await api.get<CarrierResponse>(`/api/carriers/listCarrierById/${id}`);
    return data;
  },

  // POST /api/carriers/createCarrier
  create: async (carrier: CarrierRequest): Promise<CarrierResponse> => {
    const { data } = await api.post<CarrierResponse>('/api/carriers/createCarrier', carrier);
    return data;
  },

  // PUT /api/carriers/updateCarrierById/{id}
  update: async (id: number, carrier: CarrierRequest): Promise<CarrierResponse> => {
    const { data } = await api.put<CarrierResponse>(`/api/carriers/updateCarrierById/${id}`, carrier);
    return data;
  },

  // DELETE /api/carriers/deleteCarrierById/{id}
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/carriers/deleteCarrierById/${id}`);
  },

  //Patch /api/carriers/{id}/status
  updateStatusLogical: async (id: number, status: string): Promise<void> => {
    await api.patch(`/api/carriers/${id}/status?status=${status}`);
  },

  // GET /api/carriers/myCarrier
  getMyCarrier: async (): Promise<CarrierResponse> => {
    const { data } = await api.get<CarrierResponse>(`/api/carriers/myCarrier`);
    return data;
  },
};