import { axiosInstance } from '@/api/axios';

export interface Department {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export const getDepartments = async (): Promise<Department[]> => {
  const { data } = await axiosInstance.get<Department[]>('/departments/');
  return data;
};
