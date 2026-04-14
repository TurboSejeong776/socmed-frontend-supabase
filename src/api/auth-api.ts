import api from './api';
import type {
  RegisterData,
  RegisterResponse,
  LoginData,
  LoginResponse,
} from '@/types/auth-type';

export async function register(
  payload: RegisterData
): Promise<RegisterResponse> {
  const res = await api.post<RegisterResponse>(
    'functions/v1/register',
    payload
  );
  return res.data;
}

export async function login(payload: LoginData): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>('functions/v1/login', payload);
  return res.data;
}
