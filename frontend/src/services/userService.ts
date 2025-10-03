import apiClient from './api.ts';
import { UserRole, UserStatus } from '../types/index.ts';
import type {
  UserResponse,
  UserRequest,
  UserUpdate,
  PasswordChange,
  UserStats,
  ApiResponse,
} from '../types/index.ts';

export class UserService {
  private static readonly USERS_PATH = '/users';

  static async getAll(
    status?: UserStatus,
    role?: UserRole
  ): Promise<UserResponse[]> {
    const response = await apiClient.get<ApiResponse<UserResponse[]>>(
      this.USERS_PATH,
      {
        params: { status, role },
      }
    );
    return response.data.data;
  }

  static async getById(id: number): Promise<UserResponse> {
    const response = await apiClient.get<ApiResponse<UserResponse>>(
      `${this.USERS_PATH}/${id}`
    );
    return response.data.data;
  }

  static async getByUsername(username: string): Promise<UserResponse> {
    const response = await apiClient.get<ApiResponse<UserResponse>>(
      `${this.USERS_PATH}/username/${username}`
    );
    return response.data.data;
  }

  static async create(data: UserRequest): Promise<UserResponse> {
    const response = await apiClient.post<ApiResponse<UserResponse>>(
      this.USERS_PATH,
      data
    );
    return response.data.data;
  }

  static async update(id: number, data: UserUpdate): Promise<UserResponse> {
    const response = await apiClient.put<ApiResponse<UserResponse>>(
      `${this.USERS_PATH}/${id}`,
      data
    );
    return response.data.data;
  }

  static async changePassword(
    id: number,
    data: PasswordChange
  ): Promise<void> {
    await apiClient.put(`${this.USERS_PATH}/${id}/password`, data);
  }

  static async updateLastLogin(id: number): Promise<void> {
    await apiClient.put(`${this.USERS_PATH}/${id}/last-login`);
  }

  static async delete(id: number): Promise<void> {
    await apiClient.delete(`${this.USERS_PATH}/${id}`);
  }

  static async getStats(): Promise<UserStats> {
    const response = await apiClient.get<ApiResponse<UserStats>>(
      `${this.USERS_PATH}/stats`
    );
    return response.data.data;
  }
}
