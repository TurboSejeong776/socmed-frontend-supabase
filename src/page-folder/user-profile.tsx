import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';

import ProfileNavbar from '@/my-components/ProfileNavbar';

import { followUser, unfollowUser } from '@/api/user-api';
import { getUserByUsername, getUserPosts, getUserLikes } from '@/api/user-api';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Send, Image, Heart } from 'lucide-react';

import Man from '@/assets/pfppl.png';
import imgpl from '@/assets/imgpl.png';

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();

  const navigate = useNavigate();
  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ['userProfile', username],
    queryFn: () => getUserByUsername(username!),
    enabled: !!username,
  });

  const { data: postsData, isLoading: postLoading } = useQuery({
    queryKey: ['userPosts', username],
    queryFn: () => getUserPosts(username!, 1, 20),
    enabled: !!username,
  });

  const { data: likedData, isLoading: likedLoading } = useQuery({
    queryKey: ['userLikes', username],
    queryFn: () => getUserLikes(username!, 1, 20),
    enabled: !!username,
  });

  const user = profileData?.data;
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing || false);
  const [followLoading, setFollowLoading] = useState(false);

  const followMutation = useMutation({
    mutationFn: () => followUser(user!.username),
    onSuccess: () => setIsFollowing(true),
    onSettled: () => setFollowLoading(false),
  });

  const unfollowMutation = useMutation({
    mutationFn: () => unfollowUser(user!.username),
    onSuccess: () => setIsFollowing(false),
    onSettled: () => setFollowLoading(false),
  });

  const handleFollowClick = () => {
    setFollowLoading(true);
    if (isFollowing) {
      unfollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  if (profileLoading || likedLoading || postLoading) {
    return <p className='text-white'>Loading...</p>;
  }

  const stat = profileData!.data.counts;
  const liked = likedData!.data.posts;
  const post = postsData?.data.posts || [];
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
                src={user?.avatarUrl || Man}
                alt='pfp'
                className='w-[64px] h-[64px] rounded-full'
              />
              <div id='usernamePlusName' className='flex flex-col'>
                <p className='font-bold text-sm sm:text-base sm:tracking-tight'>
                  {user?.name}
                </p>
                <p className='text-sm tracking-tight sm:text-base'>
                  {user?.username}
                </p>
              </div>
            </div>
            <div
              id='headerButtons'
              className='flex flex-row max-w-[361px] gap-[12px] justify-center items-center'
            >
              <Button
                onClick={handleFollowClick}
                disabled={followLoading}
                className={`flex w-[130px] h-[48px] border-[1px] border-[#181D27] bg-transparent ${
                  isFollowing ? 'text-[#7F51F9]' : 'text-white'
                }`}
              >
                {followLoading
                  ? 'Loading…'
                  : isFollowing
                  ? 'Following'
                  : 'Follow'}
              </Button>
              <Button className='flex w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] border-[1px] border-[#181D27] bg-transparent rounded-full'>
                <Send className='w-[24px] h-[24px]' />
              </Button>
            </div>
          </div>

          <p className='text-sm tracking-tight sm:text-base'>{user?.bio}</p>

          <div
            id='userStat'
            className='flex flex-row w-full gap-[24px] justify-between'
          >
            <div
              id='postCount'
              className='flex flex-col w-full gap-[2px] items-center justify-center'
            >
              <p className='font-bold text-lg sm:text-xl tracking-tight'>
                {stat.post}
              </p>
              <p className='text-xs sm:text-base text-[#A4A7AE]'>
                {stat.post > 1 ? 'Posts' : 'Post'}
              </p>
            </div>
            <Separator orientation='vertical' className='bg-[#181D27]' />
            <div
              id='follwerCount'
              className='flex flex-col w-full gap-[2px] items-center justify-center'
            >
              <p className='font-bold text-lg sm:text-xl tracking-tight'>
                {stat.followers}
              </p>
              <p className='text-xs sm:text-base text-[#A4A7AE]'>
                {stat.followers > 1 ? 'Followers' : 'Follower'}
              </p>
            </div>
            <Separator orientation='vertical' className='bg-[#181D27]' />
            <div
              id='followingCount'
              className='flex flex-col w-full gap-[2px] items-center justify-center'
            >
              <p className='font-bold text-lg sm:text-xl tracking-tight'>
                {stat.following}
              </p>
              <p className='text-xs sm:text-base text-[#A4A7AE]'>
                {stat.following > 1 ? 'Followings' : 'Following'}
              </p>
            </div>
            <Separator orientation='vertical' className='bg-[#181D27]' />
            <div
              id='likeCount'
              className='flex flex-col w-full gap-[2px] items-center justify-center'
            >
              <p className='font-bold text-lg sm:text-xl tracking-tight'>
                {stat.likes}
              </p>
              <p className='text-xs sm:text-base text-[#A4A7AE]'>
                {stat.likes > 1 ? 'Likes' : 'Like'}
              </p>
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
              {post.map((post) => (
                <img
                  onClick={() => navigate(`/post/${post.id}`)}
                  src={post.imageUrl || imgpl}
                  alt='pfp'
                  className='w-[119.15px] h-[119.15px] sm:w-[268px] sm:h-[268px]'
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value='liked'>
            <div
              id='likedImages'
              className='flex flex-wrap w-full gap-[1.78px] sm:gap-[4px]'
            >
              {liked.map((liked) => (
                <img
                  onClick={() => navigate(`/post/${liked.id}`)}
                  src={liked.imageUrl || imgpl}
                  alt='pfp'
                  className='w-[119.15px] h-[119.15px] sm:w-[268px] sm:h-[268px]'
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default UserProfile;
