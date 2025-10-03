import apiClient from './api.ts';
import type {
  CategoryResponse,
  CategoryRequest,
  CategoryUpdate,
  ApiResponse,
} from '../types/index.ts';

export class CategoryService {
  private static readonly CATEGORIES_PATH = '/categories';

  static async getAll(activeOnly: boolean = false): Promise<CategoryResponse[]> {
    const response = await apiClient.get<ApiResponse<CategoryResponse[]>>(
      this.CATEGORIES_PATH,
      {
        params: { active: activeOnly },
      }
    );
    return response.data.data;
  }

  static async getById(id: number): Promise<CategoryResponse> {
    const response = await apiClient.get<ApiResponse<CategoryResponse>>(
      `${this.CATEGORIES_PATH}/${id}`
    );
    return response.data.data;
  }

  static async create(data: CategoryRequest): Promise<CategoryResponse> {
    const response = await apiClient.post<ApiResponse<CategoryResponse>>(
      this.CATEGORIES_PATH,
      data
    );
    return response.data.data;
  }

  static async update(id: number, data: CategoryUpdate): Promise<CategoryResponse> {
    const response = await apiClient.put<ApiResponse<CategoryResponse>>(
      `${this.CATEGORIES_PATH}/${id}`,
      data
    );
    return response.data.data;
  }

  static async delete(id: number): Promise<void> {
    await apiClient.delete(`${this.CATEGORIES_PATH}/${id}`);
  }

  static async ping(): Promise<string> {
    const response = await apiClient.get<string>(`${this.CATEGORIES_PATH}/ping`);
    return response.data;
  }
}
