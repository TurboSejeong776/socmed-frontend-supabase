import { useState, useEffect } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { createComment, getComments } from '@/api/post-api';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import type { UserPost } from '@/types/user-type';
import type { CommentPayload } from '@/types/comment-types';

import EmojiPicker from 'emoji-picker-react';
import type { EmojiClickData } from 'emoji-picker-react';

import { DrawerContent, DrawerClose } from '@/components/ui/drawer';
import { toast } from 'sonner';
import { DialogContent } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import CommentCard from './CommentCard';

import {
  Heart,
  Send,
  MessageSquareMore,
  Bookmark,
  X,
  Ellipsis,
  Smile,
} from 'lucide-react';

import imgpl from '@/assets/imgpl.png';
import Man from '@/assets/pfppl.png';

type CommentListProps = {
  post: UserPost;
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

const CommentList: React.FC<CommentListProps> = ({ post }) => {
  const isMobile = useIsMobile();
  const [comment, setComment] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const timeAgo = (dateString: string | Date) => dayjs(dateString).fromNow();

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setComment((prev) => prev + emojiData.emoji);
    setShowPicker(false);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['comments', post.id],
      queryFn: ({ pageParam }) => getComments(post.id, pageParam ?? 1, 10),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { page, totalPages } = lastPage.data.pagination;
        return page < totalPages ? page + 1 : undefined;
      },
    });

  const comments = data?.pages.flatMap((p) => p.data.comments) ?? [];

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: CommentPayload) => createComment(post.id, payload),

    onSuccess: async () => {
      toast('Comment created!');
      setComment('');
      setShowPicker(false);

      await queryClient.invalidateQueries({
        queryKey: ['comments', post.id],
      });
    },

    onError: (error) => {
      console.error('Failed to create comment:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    mutate({ text: comment });
  };

  return isMobile ? (
    <DrawerContent className=' flex flex-col w-full gap-[8px] sm:hidden border-none bg-[#0A0D12] text-white px-[16px] pt-[16px] pb-[32px]'>
      <div className='flex flex-row w-full justify-between'>
        <p className='font-bold text-base tracking-tight'>Comments</p>
        <DrawerClose asChild>
          <X className='w-[24px] h-[24px]' />
        </DrawerClose>
      </div>

      {comments.length === 0 ? (
        <div className='flex flex-col w-[361px] h-[155px] gap-[4px] items-center justify-center'>
          <p className='font-bold text-base'>No Comments yet</p>
          <p className='text-sm text-[#A4A7AE] tracking-tight'>
            Start the conversation
          </p>
        </div>
      ) : (
        <ScrollArea className='h-[336px] flex items-center justify-center'>
          {comments.map((c) => (
            <div key={c.id} className='flex flex-col mb-[8px] items-center'>
              <CommentCard comment={c} />
              <Separator className='bg-[#181D27]' />
            </div>
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
        </ScrollArea>
      )}

      <form
        onSubmit={handleSubmit}
        className='flex flex-row w-full gap-[8px] justify-center items-center'
      >
        <button
          type='button'
          onClick={() => setShowPicker((prev) => !prev)}
          className='flex w-[48px] h-[48px] rounded-xl items-center justify-center text-center'
        >
          <Smile className='w-[24px] h-[24px]' />
        </button>
        {showPicker && (
          <div className='absolute mt-2 z-50'>
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <div className='flex flex-row w-full h-[48px] rounded-xl border-[1px] border-[#181D27] px-[16px] py-[8px] gap-[8px] bg-[#0A0D12] items-center justify-center'>
          <Input
            className='w-full h-[30px] font-medium text-base border-none'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Write a comment...'
          />
          <Button
            type='submit'
            disabled={isPending}
            className='w-[48px] bg-transparent'
          >
            <p className='font-bold text-sm text-[#7F51F9]'>
              {isPending ? '...' : 'Post'}
            </p>
          </Button>
        </div>
      </form>
    </DrawerContent>
  ) : (
    <DialogContent className='hidden sm:flex flex-row min-w-[1200px] max-w-none h-[768px] gap-[24px] border-none bg-[#0A0D12] text-white'>
      <img
        src={post.imageUrl || imgpl}
        alt='IMG404'
        className='min-w-[720px] min-h-[720px]'
      />
      <div className='flex flex-col w-full p-[20px] gap-[46px] h-[720px]'>
        <div className='flex flex-col w-full h-full gap-[16px]'>
          <div className='flex flex-col w-full h-[194px] gap-[8px]'>
            <div className='flex flex-row w-full justify-between'>
              <div className='flex flex-row gap-[13px]'>
                <img
                  src={post.author.avatarUrl || Man}
                  alt='pfp'
                  className='w-[40px] h-[40px]'
                />
                <div className='flex flex-col gap-[2px]'>
                  <p className='font-bold text-xs sm:text-sm sm:tracking-tight'>
                    {post.author.username}
                  </p>
                  <p className='text-xs tracking-tight sm:tracking-normal'>
                    {timeAgo(post.createdAt)}
                  </p>
                </div>
              </div>
              <Ellipsis className='w-[24px] h-[24px]' />
            </div>
            <p className='text-sm tracking-tight'>{post.caption}</p>
          </div>
          <Separator className='bg-[#181D27]' />
          <div className='flex flex-col w-full h-[254px] gap-[16px]'>
            <p className='font-bold text-base tracking-tight'>Comments</p>
            {comments.length === 0 ? (
              <div className='flex flex-col w-[361px] h-[155px] gap-[4px] items-center justify-center'>
                <p className='font-bold text-base'>No Comments yet</p>
                <p className='text-sm text-[#A4A7AE] tracking-tight'>
                  Start the conversation
                </p>
              </div>
            ) : (
              <ScrollArea className='h-[224px] flex items-center justify-center'>
                {comments.map((c) => (
                  <div className='flex flex-col mb-[8px] items-center'>
                    <CommentCard key={c.id} comment={c} />
                    <Separator className='bg-[#181D27]' />
                  </div>
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
              </ScrollArea>
            )}
          </div>
        </div>

        <div className='flex flex-col w-full gap-[16px]'>
          <div className='flex flex-row w-full justify-between'>
            <div className='flex flex-row min-w-[168px] gap-[16px] items-center'>
              <div className='flex flex-row justify-center items-center gap-[6px]'>
                <Heart
                  className={`w-[24px] h-[24px] text-white ${
                    post.likedByMe ? 'fill-white' : 'fill-none'
                  }`}
                />
                <p className='font-semibold text-base tracking-tight'>
                  {post.likeCount}
                </p>
              </div>
              <div className='flex flex-row justify-center items-center gap-[6px]'>
                <MessageSquareMore
                  className={`w-[24px] h-[24px] text-white `}
                />
                <p className='font-semibold text-base tracking-tight'>
                  {post.commentCount}
                </p>
              </div>
              <Send className={`w-[24px] h-[24px] text-white `} />
            </div>
            <Bookmark className={`w-[24px] h-[24px] text-white `} />
          </div>

          <form
            onSubmit={handleSubmit}
            className='flex flex-row w-full gap-[8px] justify-center items-center'
          >
            <button
              type='button'
              onClick={() => setShowPicker((prev) => !prev)}
              className='flex w-[48px] h-[48px] rounded-xl items-center justify-center text-center'
            >
              <Smile className='w-[24px] h-[24px]' />
            </button>
            {showPicker && (
              <div className='absolute mt-2 z-50'>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
            <div className='flex flex-row w-full h-[48px] rounded-xl border-[1px] border-[#181D27] px-[16px] py-[8px] gap-[8px] bg-[#0A0D12] items-center justify-center'>
              <Input
                className='w-full h-[30px] font-medium text-base border-none'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder='Write a comment...'
              />
              <Button
                type='submit'
                disabled={isPending}
                className='w-[48px] bg-transparent'
              >
                <p className='font-bold text-sm text-[#7F51F9]'>
                  {isPending ? '...' : 'Post'}
                </p>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DialogContent>
  );
};

export default CommentList;
