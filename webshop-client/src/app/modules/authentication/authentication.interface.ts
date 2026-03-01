export interface User {
  id: number;
  email: string;
  isAdmin: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresAt: string; // ISO date string ?
  isAdmin: boolean;
  email: string;
  userId: number;
}

// Generic API response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

// Example: For a list of users
export type UsersResponse = ApiResponse<User[]>;
