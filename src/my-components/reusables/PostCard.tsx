import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  likePost,
  unlikePost,
  bookmarkPost,
  unbookmarkPost,
} from '@/api/post-api';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import type { UserPost } from '@/types/user-type';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';

import { Heart, MessageSquareMore, Send, Bookmark } from 'lucide-react';

import placeholder from '@/assets/pfppl.png';
import placeholder2 from '@/assets/imgpl.png';

import LikeList from './LikeList';
import CommentList from './CommentList';

type PostProps = {
  post: UserPost;
  bookmarked?: boolean;
};
dayjs.extend(relativeTime);

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

const PostCard: React.FC<PostProps> = ({
  post,
  bookmarked: bookmarkedProp = false,
}) => {
  const [showFull, setShowFull] = useState(false);
  const timeAgo = (dateString: string | Date) => dayjs(dateString).fromNow();
  const isMobile = useIsMobile();

  const [liked, setLiked] = useState(post.likedByMe);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [bookmarked, setBookmarked] = useState(bookmarkedProp);

  const likeMutation = useMutation({
    mutationFn: (doLike: boolean) =>
      doLike ? likePost(post.id) : unlikePost(post.id),

    onMutate: (doLike: boolean) => {
      // keep optimistic UI, but we'll correct onSuccess
      setLiked(doLike);
      setLikeCount((prev) => prev + (doLike ? 1 : -1));
    },

    onSuccess: (res) => {
      // YOUR actual response is like: { ok: true, liked: true, totalLikes: 3 }
      setLiked(!!res.data.liked);
      setLikeCount(res.data.likeCount ?? 0);
    },

    onError: () => {
      // rollback (optional; minimal rollback is re-derive from props)
      setLiked(post.likedByMe);
      setLikeCount(post.likeCount);
    },
  });

  const bookmarkMutation = useMutation({
    mutationFn: () =>
      bookmarked ? unbookmarkPost(post.id) : bookmarkPost(post.id),
    onMutate: () => setBookmarked(!bookmarked),
    onError: () => setBookmarked(bookmarked),
  });

  return (
    <section className='flex flex-col w-[361px] gap-[8px] bg-black text-white sm:w-[600px] sm:gap-[12px] justify-center'>
      <div className='flex flex-row w-full gap-[8px] sm:gap-[12px] justify-center'>
        <img
          src={post.author.avatarUrl || placeholder}
          alt='pfp'
          className='w-[44px] h-[44px] sm:w-[64px] sm:h-[64px] rounded-full'
        />
        <div className='flex flex-col w-full justify-center'>
          <p className='font-bold text-sm tracking-tight sm:text-base'>
            {post.author.username}
          </p>
          <p className='text-xs text-[#A4A7AE] sm:tracking-tight sm:text-sm'>
            {timeAgo(post.createdAt)}
          </p>
        </div>
      </div>
      <img
        src={post.imageUrl || placeholder2}
        alt='postImage'
        className='w-[361px] max-h-[361px] sm:w-[600px] sm:max-h-[600px] overflow-hidden'
      />
      <div className='flex flex-row w-full justify-between'>
        <div className='flex flex-row min-w-[168px] gap-[12px] sm:gap-[16px] items-center '>
          <div className='flex flex-row gap-[6px] items-center '>
            {/* Clicking the count summons LikeList who has dialog and drawer form */}
            <Heart
              onClick={() => likeMutation.mutate(!liked)}
              className={`w-[24px] h-[24px] text-white cursor-pointer ${
                liked ? 'fill-white' : 'fill-none'
              }`}
            />
            {/* LikeList contains both Drawer (base) and Dialog (sm) forms */}
            {isMobile ? (
              <Drawer>
                <DrawerTrigger>
                  <p className='font-semibold text-sm sm:text-base tracking-tight'>
                    {likeCount}
                  </p>
                </DrawerTrigger>
                <LikeList postId={post.id} />
              </Drawer>
            ) : (
              <Dialog>
                <DialogTrigger>
                  <p className='font-semibold text-sm sm:text-base tracking-tight'>
                    {likeCount}
                  </p>
                </DialogTrigger>
                <LikeList postId={post.id} />
              </Dialog>
            )}
          </div>
          <div className='flex flex-row gap-[6px] items-center'>
            {/* Clicking the count summons CommentList who has dialog and drawer form */}
            <MessageSquareMore className={`w-[24px] h-[24px] text-white `} />
            {isMobile ? (
              <Drawer>
                <DrawerTrigger>
                  <p className='font-semibold text-sm sm:text-base tracking-tight'>
                    {post.commentCount}
                  </p>
                </DrawerTrigger>
                <CommentList post={post} />
              </Drawer>
            ) : (
              <Dialog>
                <DialogTrigger>
                  <p className='font-semibold text-sm sm:text-base tracking-tight'>
                    {post.commentCount}
                  </p>
                </DialogTrigger>
                <CommentList post={post} />
              </Dialog>
            )}
          </div>
          <Send className={`w-[24px] h-[24px] text-white `} />
        </div>
        {/* Bookmark API is separate from the Post itself. */}
        <Bookmark
          className={`w-[24px] h-[24px] text-white cursor-pointer ${
            bookmarked ? 'fill-white' : 'fill-none'
          }`}
          onClick={() => bookmarkMutation.mutate()}
        />
      </div>

      <div className='flex flex-col w-full sm:w-[526px] sm:gap-[4px]'>
        <p className='font-bold text-sm sm:text-base sm:tracking-tight'>
          {post.author.username}
        </p>
        <p
          className={`text-sm tracking-tight sm:text-base ${
            showFull ? '' : 'line-clamp-2'
          }`}
        >
          {post.caption}
        </p>
        <button
          className={`text-left font-bold text-sm text-[#7F51F9] sm:text-base sm:tracking-tight ${
            showFull ? 'hidden' : ''
          }`}
          onClick={() => setShowFull(!showFull)}
        >
          Show More
        </button>
      </div>
    </section>
  );
};

export default PostCard;
