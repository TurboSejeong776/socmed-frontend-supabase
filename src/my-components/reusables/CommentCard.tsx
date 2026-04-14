import { useState } from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import type { Comment } from '@/types/comment-types';

import Man from '@/assets/Man.png';

type CommentProps = {
  comment: Comment;
};
dayjs.extend(relativeTime);

const CommentCard: React.FC<CommentProps> = ({ comment }) => {
  const [dateSwitch, setDateSwitch] = useState(false);
  const timeAgo = (dateString: string | Date) => dayjs(dateString).fromNow();

  return (
    <section className='flex flex-col w-full min-h-[76px] gap-[8px] text-white sm:gap-[10px]'>
      <div className='flex flex-row gap-[8px] items-center'>
        <img
          src={comment.author.avatarUrl || Man}
          alt='pfp'
          className='w-[40px] h-[40px] rounded-full'
        />
        <div className='flex flex-col justify-center'>
          <p className='font-bold text-xs sm:text-sm sm:tracking-tight'>
            {comment.author.username}
          </p>
          <button
            className='text-xs tracking-tight sm:tracking-normal'
            onClick={() => setDateSwitch(!dateSwitch)}
          >
            {dateSwitch ? comment.createdAt : timeAgo(comment.createdAt)}
          </button>
        </div>
      </div>
      <p className='text-xs sm:text-sm '>{comment.text}</p>
    </section>
  );
};

export default CommentCard;
