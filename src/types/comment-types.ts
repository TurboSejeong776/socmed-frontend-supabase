import type { Pagination } from './user-type';

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export interface CommentPayload {
  text: string;
}

export interface Comment {
  id: number;
  text: string;
  createdAt: string;
  author: {
    id: number;
    username: string;
    name: string;
    avatarUrl: string | null;
  };
  isMine?: boolean;
}

export interface CommentList {
  comments: Comment[];
  pagination: Pagination;
}

export interface DeleteComment {
  deleted: boolean;
}

export type CreateCommentResponse = ApiResponse<Comment>;

export type GetPostCommentsResponse = ApiResponse<CommentList>;

export type DeleteCommentResponse = ApiResponse<DeleteComment>;
