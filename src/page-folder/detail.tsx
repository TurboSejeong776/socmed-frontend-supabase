import { useMemo } from 'react';
import { useParams } from 'react-router';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getPostDetail, getBookmarkedPosts } from '@/api/post-api';

import Navbar from '@/my-components/Navbar';
import PostCard from '@/my-components/reusables/PostCard';
import PostCardSkelly from '@/my-components/reusables/PostCardSK';

const Detail = () => {
  const { postId } = useParams<{ postId: string }>();
  const numericPostId = Number(postId);
  const {
    data: postData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['post', numericPostId],
    queryFn: () => getPostDetail(numericPostId),
    enabled: !isNaN(numericPostId),
  });

  const { data: bookmarkedData } = useInfiniteQuery({
    queryKey: ['bookmarks'],
    queryFn: ({ pageParam }) => getBookmarkedPosts(pageParam, 20),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });

  const bookmarkedIds = useMemo(() => {
    if (!bookmarkedData) return new Set<number>();
    const allBookmarks = bookmarkedData.pages.flatMap((p) => p.data.posts);
    return new Set(allBookmarks.map((p) => p.id));
  }, [bookmarkedData]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <section className='flex flex-col w-screen h-screen bg-black text-white items-center'>
          <div className='mt-[84px] sm:mt-[100px]'>
            <PostCardSkelly />
          </div>
        </section>
      </>
    );
  }

  if (isError) return <p className='text-red-500'>Error loading feed</p>;

  const post = postData?.data;

  console.log(postData);

  if (!post) return <p className='text-red-500'>Post not found</p>;
  return (
    <>
      <Navbar />
      <section className='flex flex-col w-screen h-screen bg-black text-white items-center '>
        <div className='mt-[84px] sm:mt-[100px]'>
          <PostCard
            key={post.id}
            post={post}
            bookmarked={bookmarkedIds.has(post.id)}
          />
        </div>
      </section>
    </>
  );
};

export default Detail;
