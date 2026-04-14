export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

//REGISTER
export interface RegisterData {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisterFeedback {
  id: number;
  username: string;
}

export type RegisterResponse = ApiResponse<RegisterFeedback>;

//LOGIN
export interface LoginData {
  email: string;
  password: string;
}

export interface LoginFeedBack {
  token: string;
  user: LoginUser;
}

export interface LoginUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
}

export type LoginResponse = ApiResponse<LoginFeedBack>;
