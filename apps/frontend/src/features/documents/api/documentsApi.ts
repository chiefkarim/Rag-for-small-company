import { axiosInstance } from '@/api/axios';

export interface Document {
  id: number;
  file_name: string;
  state: 'pending' | 'embedded' | 'failed';
  source_file_update_at: string;
  created_at: string;
  updated_at: string;
}

export const getDocuments = async (): Promise<Document[]> => {
  const { data } = await axiosInstance.get<Document[]>('/documents/');
  return data;
};

export interface EmbedRequest {
  file_ids: string[];
  department?: string;
  project_id?: string;
}

export const embedDocuments = async (payload: EmbedRequest): Promise<void> => {
  const requestData: Record<string, any> = {
    file_ids: payload.file_ids,
  };
  
  if (payload.department) {
    requestData.department = payload.department;
  } else if (!payload.project_id) {
    // Only default to general if neither department nor project is specified
    requestData.department = 'general';
  }

  if (payload.project_id) {
    requestData.project_id = payload.project_id;
  }

  const { data } = await axiosInstance.post('/embed', requestData);
  return data;
};
