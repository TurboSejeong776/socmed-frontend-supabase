export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export interface UserProfile {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

export interface UserStats {
  posts: number;
  followers: number;
  following: number;
  likes: number;
}

export interface UpdateProfile {
  name: string;
  username: string;
  phone: string;
  bio: string | null;
  avatarUrl: string | null;
}

export type ProfileResponse = ApiResponse<{
  profile: UserProfile;
  stats: UserStats;
}>;

export type UpdateProfileResponse = ApiResponse<
  UserProfile & { updatedAt: string }
>;
