import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostLikes } from '@/api/post-api';

import { DrawerContent, DrawerClose } from '@/components/ui/drawer';
import { DialogContent, DialogClose } from '@/components/ui/dialog';

import LikeCard from './LikeCard';

import { X } from 'lucide-react';

type LikeListProps = {
  postId: number;
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

const LikeList: React.FC<LikeListProps> = ({ postId }) => {
  const isMobile = useIsMobile();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['likes', postId],
      queryFn: ({ pageParam }) => getPostLikes(postId, pageParam ?? 1),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { page, totalPages } = lastPage.data.pagination;
        return page < totalPages ? page + 1 : undefined;
      },
    });
  const likes = data?.pages.flatMap((p) => p.data.users) ?? [];

  return isMobile ? (
    <DrawerContent className=' z-50 sm:hidden flex flex-col w-full rounded-tl-2xl rounded-tr-2xl px-[16px] pt-[16px] pb-[32px] gap-[12px] border-none bg-[#0A0D12] text-white '>
      <div className='flex flex-row w-full justify-between'>
        <p className='font-bold text-base tracking-tight'>Likes</p>
        <DrawerClose asChild>
          <X className='w-[24px] h-[24px]' />
        </DrawerClose>
      </div>
      {likes.map((like) => (
        <LikeCard key={like.id} like={like} />
      ))}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className='text-[#7F51F9] mt-2 font-bold'
        >
          {isFetchingNextPage ? 'Loading…' : 'Load More'}
        </button>
      )}
    </DrawerContent>
  ) : (
    <DialogContent className='hidden sm:flex flex-col w-[548px] gap-[16px] border-none bg-[#0A0D12] text-white'>
      <div className='flex flex-row w-full justify-between'>
        <p className='font-bold text-xl tracking-tight'>Likes</p>
        <DialogClose className='w-[32px] h-[32px]' />
      </div>
      {likes.map((like) => (
        <LikeCard key={like.id} like={like} />
      ))}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className='text-[#7F51F9] mt-2 font-bold'
        >
          {isFetchingNextPage ? 'Loading…' : 'Load More'}
        </button>
      )}
    </DialogContent>
  );
};

export default LikeList;
