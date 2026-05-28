import ProfileNavbar from '@/my-components/ProfileNavbar';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrambleNumber } from '@/my-components/reusables/ScrambleNumber';

import { Send, Image, Heart } from 'lucide-react';

import Man from '@/assets/pfppl.png';
import imgpl from '@/assets/imgpl.png';

const UserProfileLoading = () => {
  return (
    <section className='flex flex-col w-screen min-h-screen bg-black text-white items-center justify-center'>
      <ProfileNavbar />
      <div className='flex flex-col w-[361px] gap-[16px] m-auto mt-[48px] sm:mt-[64px] bg-black text-white sm:w-[812px] justify-center items-center'>
        <div
          id='top'
          className='flex flex-col w-full gap-[16px] justify-center'
        >
          <div
            id='header'
            className='flex flex-col w-full gap-[12px] sm:flex-row sm:justify-between'
          >
            <div
              id='userData'
              className='flex flex-row gap-[12px] sm:gap-[20px]'
            >
              <img
                src={Man}
                alt='pfp'
                className='w-[64px] h-[64px] rounded-full animate-pulse'
              />
              <div id='usernamePlusName' className='flex flex-col'>
                <p className='font-bold text-sm sm:text-base sm:tracking-tight'>
                  Loading...
                </p>
                <p className='text-sm tracking-tight sm:text-base'>
                  Loading...
                </p>
              </div>
            </div>
            <div
              id='headerButtons'
              className='flex flex-row max-w-[361px] gap-[12px] justify-center items-center'
            >
              <Button
                className={`flex w-[130px] h-[48px] border-[1px] border-[#181D27] bg-transparent text-[#777777] animate-pulse justify-center items-center leading-tight`}
              >
                Checking follow <br /> status...
              </Button>
              <Button className='flex w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] border-[1px] border-[#181D27] bg-transparent rounded-full'>
                <Send className='w-[24px] h-[24px]' />
              </Button>
            </div>
          </div>

          <p className='text-sm tracking-tight sm:text-base animate-pulse'>
            Loading...
          </p>

          <div
            id='userStat'
            className='flex flex-row w-full gap-[24px] justify-between'
          >
            <div
              id='postCount'
              className='flex flex-col w-full gap-[2px] items-center justify-center'
            >
              <p className='font-bold text-lg sm:text-xl tracking-tight animate-pulse'>
                <ScrambleNumber value={Math.floor(Math.random() * 100)} />
              </p>
              <p className='text-xs sm:text-base text-[#A4A7AE]'>Post</p>
            </div>
            <Separator orientation='vertical' className='bg-[#181D27]' />
            <div
              id='follwerCount'
              className='flex flex-col w-full gap-[2px] items-center justify-center'
            >
              <p className='font-bold text-lg sm:text-xl tracking-tight'>
                <ScrambleNumber value={Math.floor(Math.random() * 100)} />
              </p>
              <p className='text-xs sm:text-base text-[#A4A7AE]'>Follower</p>
            </div>
            <Separator orientation='vertical' className='bg-[#181D27]' />
            <div
              id='followingCount'
              className='flex flex-col w-full gap-[2px] items-center justify-center'
            >
              <p className='font-bold text-lg sm:text-xl tracking-tight animate-pulse'>
                <ScrambleNumber value={Math.floor(Math.random() * 100)} />
              </p>
              <p className='text-xs sm:text-base text-[#A4A7AE]'>Following</p>
            </div>
            <Separator orientation='vertical' className='bg-[#181D27]' />
            <div
              id='likeCount'
              className='flex flex-col w-full gap-[2px] items-center justify-center'
            >
              <p className='font-bold text-lg sm:text-xl tracking-tight animate-pulse'>
                <ScrambleNumber value={Math.floor(Math.random() * 100)} />
              </p>
              <p className='text-xs sm:text-base text-[#A4A7AE]'>Like</p>
            </div>
          </div>
        </div>
        <Tabs defaultValue='post' className='w-full bg-black'>
          <TabsList className='w-full bg-black text-white'>
            <TabsTrigger
              value='post'
              className='items-center justify-center text-white border-b-[1px] border-transparent data-[state=active]:border-b-white data-[state=active]:bg-transparent rounded-none'
            >
              <Image className='w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] ' />
              <p className='font-bold text-sm sm:text-base tracking-tight'>
                Gallery
              </p>
            </TabsTrigger>
            <TabsTrigger
              value='liked'
              className='items-center justify-center text-white border-b-[1px] border-transparent data-[state=active]:border-b-white data-[state=active]:bg-transparent rounded-none'
            >
              <Heart className='w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] [state=active]:fill-white' />
              <p className='font-bold text-sm sm:text-base tracking-tight'>
                Liked
              </p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value='post'>
            <div
              id='userImages'
              className='flex flex-wrap w-full gap-[1.78px] sm:gap-[4px]'
            >
              <img
                src={imgpl}
                alt='pfp'
                className='w-[119.15px] h-[119.15px] sm:w-[268px] sm:h-[268px] animate-pulse'
              />
              <img
                src={imgpl}
                alt='pfp'
                className='w-[119.15px] h-[119.15px] sm:w-[268px] sm:h-[268px] animate-pulse'
              />
              <img
                src={imgpl}
                alt='pfp'
                className='w-[119.15px] h-[119.15px] sm:w-[268px] sm:h-[268px] animate-pulse'
              />
            </div>
          </TabsContent>
          <TabsContent value='liked'>
            <div
              id='likedImages'
              className='flex flex-wrap w-full gap-[1.78px] sm:gap-[4px]'
            >
              <img
                src={imgpl}
                alt='pfp'
                className='w-[119.15px] h-[119.15px] sm:w-[268px] sm:h-[268px] animate-pulse'
              />
              <img
                src={imgpl}
                alt='pfp'
                className='w-[119.15px] h-[119.15px] sm:w-[268px] sm:h-[268px] animate-pulse'
              />
              <img
                src={imgpl}
                alt='pfp'
                className='w-[119.15px] h-[119.15px] sm:w-[268px] sm:h-[268px] animate-pulse'
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default UserProfileLoading;
