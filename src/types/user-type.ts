export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  bio: string | null;
  avatarUrl: string | null;
  counts: {
    post: number;
    followers: number;
    following: number;
    likes: number;
  };
  isFollowing: boolean;
  isMe: boolean;
}

export interface SearchUser {
  id: number;
  username: string;
  name: string;
  avatarUrl: string | null;
  isFollowedByMe: boolean;
}

export interface UserPost {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: string;
  author: {
    id: number;
    username: string;
    name: string;
    avatarUrl: string | null;
  };
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SearchData {
  users: SearchUser[];
  pagination: Pagination;
}

export interface UserPostsData {
  posts: UserPost[];
  pagination: Pagination;
}

export interface FollowResponse {
  following: boolean;
}

export type PublicUserResponse = ApiResponse<User>;

export type UserSearchResponse = ApiResponse<SearchData>;

export type UserPostsResponse = ApiResponse<UserPostsData>;

export type FollowUserResponse = ApiResponse<FollowResponse>;
