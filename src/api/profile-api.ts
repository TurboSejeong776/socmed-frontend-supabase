import api from './api';
import type {
  ProfileResponse,
  UpdateProfile,
  UpdateProfileResponse,
} from '@/types/profile-types';

import type { UserSearchResponse } from '@/types/user-type';

export async function getMyProfile(): Promise<ProfileResponse> {
  const res = await api.get<ProfileResponse>('/functions/v1/me-api/me');
  return res.data;
}

export async function updateMyProfile(
  payload: UpdateProfile
): Promise<UpdateProfileResponse> {
  const res = await api.patch<UpdateProfileResponse>(
    '/functions/v1/me-api/me',
    payload
  );
  return res.data;
}

export async function getMyFollowing(
  page: number = 1,
  limit: number = 20
): Promise<UserSearchResponse> {
  const res = await api.get<UserSearchResponse>(
    '/functions/v1/me-api/following',
    {
      params: { page, limit },
    }
  );
  return res.data;
}

export async function getMyFollowers(
  page: number = 1,
  limit: number = 20
): Promise<UserSearchResponse> {
  const res = await api.get<UserSearchResponse>(
    '/functions/v1/me-api/followers',
    {
      params: { page, limit },
    }
  );
  return res.data;
}

//Custom endpoint to avoid base64 shenanigans
export async function updateMyProfileX(
  payload: UpdateProfile & { avatar?: File | null }
): Promise<UpdateProfileResponse> {
  const formData = new FormData();

  formData.append('name', payload.name);
  formData.append('username', payload.username);
  formData.append('phone', payload.phone);
  formData.append('bio', payload.bio ?? '');

  if (payload.avatar) {
    formData.append('avatar', payload.avatar);
  }

  const res = await api.patch<UpdateProfileResponse>(
    '/functions/v1/me-api/me',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return res.data;
}
