import { Heart, MessageSquareMore, Send, Bookmark } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

import placeholder from '@/assets/pfppl.png';
import placeholder2 from '@/assets/imgpl.png';

const PostCardSkelly = () => {
  return (
    <section className='flex flex-col w-[361px] gap-[8px] bg-black text-white sm:w-[600px] sm:gap-[12px] justify-center'>
      <div className='flex flex-row w-full gap-[8px] sm:gap-[12px] justify-center'>
        <img
          src={placeholder}
          alt='pfp'
          className='w-[44px] h-[44px] sm:w-[64px] sm:h-[64px] rounded-full'
        />
        <div className='flex flex-col w-full justify-center'>
          <Skeleton className='w-full' />
          <Skeleton className='w-full' />
        </div>
      </div>
      <img
        src={placeholder2}
        alt='postImage'
        className='w-[361px] max-h-[361px] sm:w-[600px] sm:max-h-[600px] overflow-hidden'
      />
      <div className='flex flex-row w-full justify-between'>
        <div className='flex flex-row min-w-[168px] gap-[12px] sm:gap-[16px] items-center '>
          <div className='flex flex-row gap-[6px] items-center '>
            {/* Clicking the count summons LikeList who has dialog and drawer form */}
            <Heart className={`w-[24px] h-[24px] text-white cursor-pointer`} />
            {/* LikeList contains both Drawer (base) and Dialog (sm) forms */}

            <Skeleton className='w-full' />
          </div>
          <div className='flex flex-row gap-[6px] items-center'>
            {/* Clicking the count summons CommentList who has dialog and drawer form */}
            <MessageSquareMore className={`w-[24px] h-[24px] text-white `} />

            <Skeleton className='w-full' />
          </div>
          <Send className={`w-[24px] h-[24px] text-white `} />
        </div>
        {/* Bookmark API is separate from the Post itself. */}
        <Bookmark className={`w-[24px] h-[24px] text-white cursor-pointer`} />
      </div>

      <div className='flex flex-col w-full sm:w-[526px] sm:gap-[4px]'>
        <Skeleton className='w-full' />
        <Skeleton className='w-full' />
        <button
          className={`text-left font-bold text-sm text-[#7F51F9] sm:text-base sm:tracking-tight`}
        >
          Show More
        </button>
      </div>
    </section>
  );
};

export default PostCardSkelly;
