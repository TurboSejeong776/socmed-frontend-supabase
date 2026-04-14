import { useEffect, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeed, getBookmarkedPosts } from '@/api/post-api';

import PostCard from '@/my-components/reusables/PostCard';
import PostCardSkelly from '@/my-components/reusables/PostCardSK';
import Navbar from '@/my-components/Navbar';

import { Separator } from '@/components/ui/separator';

import type { UserPost } from '@/types/user-type';

const Homepage = () => {
  const navigate = useNavigate();

  const isLoggedIn = Boolean(
    localStorage.getItem('auth') || sessionStorage.getItem('auth')
  );
  console.log(
    'token now:',
    localStorage.getItem('auth'),
    sessionStorage.getItem('auth')
  );
  useEffect(() => {
    if (!isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam }) => getFeed(pageParam, 20),
    initialPageParam: 1,
    enabled: isLoggedIn,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;

      return page < totalPages ? page + 1 : undefined;
    },
  });
  console.log('page.data keys:', Object.keys(data?.pages?.[0]?.data ?? {}));
  console.log('isArray(page.data)?', Array.isArray(data?.pages?.[0]?.data));

  const { data: bookmarkedData } = useInfiniteQuery({
    queryKey: ['bookmarks'],
    queryFn: ({ pageParam }) => getBookmarkedPosts(pageParam, 20),
    initialPageParam: 1,
    enabled: isLoggedIn,
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
        <section className='flex flex-col w-screen bg-black text-white justify-center items-center '>
          <div className='flex flex-col w-[361px] gap-[16px] m-auto mt-[64px] sm:mt-[80px] justify-center items-center'>
            {Array.from({ length: 5 }).map((_, i) => (
              <PostCardSkelly key={i} />
            ))}
          </div>
        </section>
      </>
    );
  }
  if (isError) return <p className='text-red-500'>Error loading feed</p>;

  return (
    <>
      <Navbar />
      <section className='flex flex-col w-screen bg-black text-white justify-center items-center '>
        <div className='flex flex-col w-[361px] gap-[16px] m-auto mt-[64px] sm:mt-[80px] justify-center items-center'>
          {data?.pages.map((page, i) => (
            <div key={i} className='flex flex-col gap-[16px]'>
              {page.data.items.map((post: UserPost) => (
                <>
                  <PostCard
                    key={post.id}
                    post={post}
                    bookmarked={bookmarkedIds.has(post.id)}
                  />
                  <Separator className='bg-[#181D27]' />
                </>
              ))}
            </div>
          ))}

          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className='text-[#7F51F9] font-bold mt-4'
            >
              {isFetchingNextPage ? 'Loading more…' : 'Load More'}
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default Homepage;
