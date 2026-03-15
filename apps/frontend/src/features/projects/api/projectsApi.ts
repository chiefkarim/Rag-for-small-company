import { axiosInstance } from '@/api/axios';

export interface Project {
  id: number;
  name: string;
  created_at: string;
}

export const getProjects = async (): Promise<Project[]> => {
  const { data } = await axiosInstance.get<Project[]>('/projects/');
  return data;
};
