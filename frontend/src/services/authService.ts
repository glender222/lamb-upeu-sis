import apiClient from './api.ts';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RefreshTokenRequest,
  TokenResponse,
  ApiResponse,
} from '../types/index.ts';

export class AuthService {
  private static readonly AUTH_PATH = '/auth';

  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      `${this.AUTH_PATH}/login`,
      credentials
    );
    return response.data.data;
  }

  static async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      `${this.AUTH_PATH}/register`,
      data
    );
    return response.data.data;
  }

  static async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const response = await apiClient.post<ApiResponse<TokenResponse>>(
      `${this.AUTH_PATH}/refresh`,
      { refreshToken } as RefreshTokenRequest
    );
    return response.data.data;
  }

  static async logout(refreshToken: string): Promise<void> {
    await apiClient.post(`${this.AUTH_PATH}/logout`, { refreshToken });
  }

  static async logoutAllDevices(username: string): Promise<void> {
    await apiClient.post(`${this.AUTH_PATH}/logout-all`, null, {
      headers: { 'X-Username': username },
    });
  }

  static async validateToken(): Promise<boolean> {
    try {
      await apiClient.get(`${this.AUTH_PATH}/validate`);
      return true;
    } catch {
      return false;
    }
  }

  static async getCurrentUser(): Promise<any> {
    const response = await apiClient.get<ApiResponse<any>>(`${this.AUTH_PATH}/me`);
    return response.data.data;
  }
}
