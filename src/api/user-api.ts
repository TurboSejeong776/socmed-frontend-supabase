import api from './api';
import type {
  PublicUserResponse,
  UserSearchResponse,
  UserPostsResponse,
  FollowUserResponse,
} from '@/types/user-type';

export async function getUserByUsername(
  username: string
): Promise<PublicUserResponse> {
  const res = await api.get<PublicUserResponse>(
    `/functions/v1/social-api/api/users/${username}`
  );
  return res.data;
}

export async function searchUsers(
  q: string,
  page = 1,
  limit = 20
): Promise<UserSearchResponse> {
  const res = await api.get<UserSearchResponse>(
    '/functions/v1/social-api/api/users/search',
    {
      params: { q, page, limit },
    }
  );
  return res.data;
}

export const getUserPosts = async (
  username: string,
  page: number,
  limit: number = 20
): Promise<UserPostsResponse> => {
  const res = await api.get<UserPostsResponse>(
    `/functions/v1/social-api/users/${username}/posts?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const getUserLikes = async (
  username: string,
  page: number,
  limit: number = 20
): Promise<UserPostsResponse> => {
  const res = await api.get<UserPostsResponse>(
    `/functions/v1/social-api/users/${username}/likes?page=${page}&limit=${limit}`
  );
  return res.data;
};

export async function followUser(
  username: string
): Promise<FollowUserResponse> {
  const res = await api.post<FollowUserResponse>(
    `/functions/v1/social-api/follow/${username}`
  );
  return res.data;
}

export async function unfollowUser(
  username: string
): Promise<FollowUserResponse> {
  const res = await api.delete<FollowUserResponse>(
    `/functions/v1/social-api/follow/${username}`
  );
  return res.data;
}

export async function getUserFollowers(
  username: string,
  page: number = 1,
  limit: number = 20
): Promise<UserSearchResponse> {
  const res = await api.get<UserSearchResponse>(
    `/functions/v1/social-api/users/${username}/followers`,
    {
      params: { page, limit },
    }
  );
  return res.data;
}

export async function getUserFollowing(
  username: string,
  page: number = 1,
  limit: number = 20
): Promise<UserSearchResponse> {
  const res = await api.get<UserSearchResponse>(
    `/functions/v1/social-api/users/${username}/following`,
    {
      params: { page, limit },
    }
  );
  return res.data;
}
