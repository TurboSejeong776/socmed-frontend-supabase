import type { UserPost, Pagination } from './user-type';

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export interface Post {
  imageUrl: string;
  caption: string;
}

export type CreatePostRequest = FormData;

export interface LikeUser {
  id: number;
  username: string;
  name: string;
  avatarUrl: string;
  isFollowedByMe: boolean;
  isMe: boolean;
  followsMe: boolean;
}

export interface MyLikedPost extends UserPost {
  likedAt: string;
}

export interface DeletePost {
  deleted: boolean;
}

export interface Feed {
  items: UserPost[];
  pagination: Pagination;
}

export interface Like {
  liked: boolean;
  likeCount: number;
}

export interface PostLikes {
  users: LikeUser[];
  pagination: Pagination;
}

export interface MyLikes {
  posts: MyLikedPost[];
  pagination: Pagination;
}

export interface Bookmark {
  saved: boolean;
}

export interface BookmarkedPosts {
  posts: Pick<UserPost, 'id' | 'imageUrl' | 'caption' | 'createdAt'>[];
  pagination: Pagination;
}

export type CreatePostResponse = ApiResponse<UserPost>;

export type PostDetailResponse = ApiResponse<UserPost>;

export type DeletePostResponse = ApiResponse<DeletePost>;

export type FeedResponse = ApiResponse<Feed>;

export type LikeResponse = ApiResponse<Like>;

export type PostLikeResponse = ApiResponse<PostLikes>;

export type MyLikesResponse = ApiResponse<MyLikes>;

export type BookmarkResponse = ApiResponse<Bookmark>;

export type BookmarkedPostsResponse = ApiResponse<BookmarkedPosts>;
