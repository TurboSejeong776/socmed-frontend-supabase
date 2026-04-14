import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { followUser } from '@/api/user-api';

import type { LikeUser } from '@/types/post-types';

import { Button } from '@/components/ui/button';

import { CircleCheck } from 'lucide-react';

import Man from '@/assets/Man.png';

type LikeProps = {
  like: LikeUser;
};

const LikeCard: React.FC<LikeProps> = ({ like }) => {
  const [followed, setFollowed] = useState(like.isFollowedByMe);

  const mutation = useMutation({
    mutationFn: () => followUser(like.username),
    onError: () => setFollowed(like.isFollowedByMe),
  });

  if (like.isMe) return null;

  return (
    <section className='flex flex-row w-full justify-between  text-white'>
      <div className='flex flex-row w-[361px] gap-[8px]'>
        <img
          src={like.avatarUrl || Man}
          alt='pfp'
          className='w-[48px] h-[48px]'
        />
        <div className='flex flex-col w-full'>
          <p className='font-bold text-sm'>{like.name}</p>
          <p className='text-[#A4A7AE] tracking-tight'>{like.username}</p>
        </div>
      </div>
      {!like.isMe && (
        <>
          {!followed ? (
            like.followsMe ? (
              <Button
                onClick={() => {
                  setFollowed(true);
                  mutation.mutate();
                }}
                className='bg-[#6936F2] hover:bg-[#7d4eff] w-[127px] h-[40px] flex px-[24px] py-[8px] rounded-full gap-[8px] font-bold text-sm text-white'
              >
                Follow Back
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setFollowed(true);
                  mutation.mutate();
                }}
                className='bg-[#6936F2] hover:bg-[#7d4eff] w-[127px] h-[40px] flex px-[24px] py-[8px] gap-[8px] rounded-full font-bold text-sm text-white'
              >
                Follow
              </Button>
            )
          ) : (
            <Button className='bg-none hover:bg-white/10 w-[127px] h-[40px] flex px-[16px] py-[8px] gap-[8px] rounded-full font-bold text-sm text-white border-[1px] border-[#181D27]'>
              <CircleCheck className='w-[20px] h-[20px]' />
              Following
            </Button>
          )}
        </>
      )}
    </section>
  );
};

export default LikeCard;
