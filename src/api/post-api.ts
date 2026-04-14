import api from './api';
import type {
  CreatePostResponse,
  PostDetailResponse,
  DeletePostResponse,
  FeedResponse,
  LikeResponse,
  PostLikeResponse,
  MyLikesResponse,
  BookmarkResponse,
  BookmarkedPostsResponse,
} from '@/types/post-types';
import type {
  CommentPayload,
  CreateCommentResponse,
  GetPostCommentsResponse,
  DeleteCommentResponse,
} from '@/types/comment-types';

export async function createPost(
  formData: FormData
): Promise<CreatePostResponse> {
  const res = await api.post('/functions/v1/social-api/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export const getPostDetail = async (
  postId: number
): Promise<PostDetailResponse> => {
  const res = await api.get<PostDetailResponse>(
    `/functions/v1/social-api/posts/${postId}`
  );
  return res.data;
};

export async function deletePost(postId: number): Promise<DeletePostResponse> {
  const res = await api.delete<DeletePostResponse>(
    `/functions/v1/social-api/${postId}`
  );
  return res.data;
}

export async function getFeed(
  page: number = 1,
  limit: number = 20
): Promise<FeedResponse> {
  const res = await api.get<FeedResponse>('/functions/v1/social-api/feed', {
    params: { page, limit },
  });
  return res.data;
}
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//Like-related APIs
export async function likePost(postId: number): Promise<LikeResponse> {
  const res = await api.post<LikeResponse>(
    `/functions/v1/social-api/posts/${postId}/like`
  );
  return res.data;
}

export async function unlikePost(postId: number): Promise<LikeResponse> {
  const res = await api.delete<LikeResponse>(
    `/functions/v1/social-api/posts/${postId}/like`
  );
  return res.data;
}

export async function getPostLikes(
  postId: number,
  page: number = 1,
  limit: number = 20
): Promise<PostLikeResponse> {
  const res = await api.get<PostLikeResponse>(
    `/functions/v1/social-api/posts/${postId}/likes`,
    {
      params: { page, limit },
    }
  );
  return res.data;
}

export async function getMyLikes(
  page: number = 1,
  limit: number = 20
): Promise<MyLikesResponse> {
  const res = await api.get<MyLikesResponse>(
    '/functions/v1/social-api/me/likes',
    {
      params: { page, limit },
    }
  );
  return res.data;
}
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//Comment-related APIs
export async function createComment(
  postId: number,
  payload: CommentPayload
): Promise<CreateCommentResponse> {
  const res = await api.post<CreateCommentResponse>(
    `/functions/v1/social-api/posts/${postId}/comments`,
    payload
  );
  return res.data;
}

export async function getComments(
  postId: number,
  page: number = 1,
  limit: number = 10
): Promise<GetPostCommentsResponse> {
  const res = await api.get<GetPostCommentsResponse>(
    `/functions/v1/social-api/posts/${postId}/comments`,
    {
      params: { page, limit },
    }
  );
  return res.data;
}

export async function deleteComment(
  commentId: number
): Promise<DeleteCommentResponse> {
  const res = await api.delete<DeleteCommentResponse>(
    `/functions/v1/social-api/comments/${commentId}`
  );
  return res.data;
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//Bookmark-related APIs
export async function bookmarkPost(postId: number): Promise<BookmarkResponse> {
  const res = await api.post<BookmarkResponse>(
    `/functions/v1/social-api/posts/${postId}/save`
  );
  return res.data;
}

export async function getBookmarkedPosts(
  page: number = 1,
  limit: number = 20
): Promise<BookmarkedPostsResponse> {
  const res = await api.get<BookmarkedPostsResponse>(
    '/functions/v1/social-api/me/saved',
    {
      params: { page, limit },
    }
  );
  return res.data;
}

export async function unbookmarkPost(
  postId: number
): Promise<BookmarkResponse> {
  const res = await api.delete<BookmarkResponse>(
    `/functions/v1/social-api/posts/${postId}/save`
  );
  return res.data;
}
