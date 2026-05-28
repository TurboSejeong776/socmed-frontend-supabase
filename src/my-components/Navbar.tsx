import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useInfiniteQuery } from '@tanstack/react-query';
import { searchUsers } from '@/api/user-api';

import Searchbar from './Searchbar';
import ProfileCard from './reusables/ProfileCard'; //takes user.name, user.username and user.avatarUrl

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

import { X, Search, Menu } from 'lucide-react';

import Lazy from '@/assets/LazyLogo.png';
import Man from '@/assets/pfppl.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchMode, setSearchMode] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(sessionStorage.getItem('token'))
  );
  const [user, setUser] = useState<{
    name: string;
    avatarUrl: string | null;
  } | null>(null);

  useEffect(() => {
    const handler = () => {
      const auth = sessionStorage.getItem('auth');
      if (auth) {
        const { token, user } = JSON.parse(auth);
        if (token && user) {
          setIsLoggedIn(true);
          setUser(user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    handler();
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const {
    data: searchData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['userSearch', keyword],
    queryFn: async ({ pageParam = 1 }) => {
      return searchUsers(keyword, pageParam, 10);
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: keyword.length > 0,
    initialPageParam: 1,
  });

  const users = useMemo(() => {
    return searchData?.pages.flatMap((page) => page.data.users) ?? [];
  }, [searchData]);
  return (
    <section className='fixed flex flex-row w-full h-[64px] border-b-[1px] border-b-[#181D27] bg-black text-white px-[16px] justify-between sm:h-[80px] sm:px-[120px]'>
      {/* ////////////////////
       This is the mobile version of the navbar 
        //////////////////// */}
      <div
        id='mobileVersion'
        className='flex flex-row w-full sm:hidden items-center justify-between'
      >
        {searchMode ? (
          <>
            <Popover open={keyword.length > 0}>
              <PopoverTrigger className='flex w-full items-center justify-center sm:hidden gap-[8px]'>
                <Searchbar keyword={keyword} setKeyword={setKeyword} />{' '}
                <Button
                  onClick={() => {
                    setSearchMode(false);
                  }}
                  className='flex w-[36px] h-[36px] bg-transparent items-center justify-center'
                >
                  <X className='flex !w-[24px] !h-[24px]' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='flex flex-col w-screen h-screen border-none gap-[16px] p-[16px] bg-black '>
                {isLoading ? (
                  <p className='text-white'>Please wait a moment...</p>
                ) : (
                  <>
                    {users.length === 0 && (
                      <p className='text-white'>No results</p>
                    )}
                    {users.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => navigate(`/profile/${user.username}`)}
                        className='cursor-pointer'
                      >
                        <ProfileCard user={user} />
                      </div>
                    ))}
                  </>
                )}
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/home')}>
              <img src={Lazy} alt='logo' className='w-[137px] h-[36px]' />
            </button>
            <div className='flex flex-row w-[195.5px] gap-[16px] items-center justify-end'>
              <Search
                className='w-[24px] h-[24px] text-white'
                onClick={() => setSearchMode(true)}
              />
              {isLoggedIn ? (
                <Button
                  onClick={() => {
                    navigate('/profile/me');
                  }}
                  className='flex w-[40px] h-[40px] p-0 bg-transparent'
                >
                  <img
                    src={user?.avatarUrl || Man}
                    alt='pfp'
                    className='w-[40px] h-[40px] rounded-full'
                  />
                </Button>
              ) : (
                <Popover>
                  <PopoverTrigger>
                    <Menu className='w-[24px] h-[24px] text-white' />
                  </PopoverTrigger>
                  <PopoverContent
                    align='end'
                    className='flex flex-row w-full min-w-[393px] px-[16px] pb-[16px] gap-[12px] justify-center items-center bg-black border-0'
                  >
                    <Button
                      onClick={() => {
                        navigate('/register');
                      }}
                      className='w-[174.5px] gap-[8px] p-[8px] bg-none border-[1px] border-[#181D27] bg-transparent rounded-full'
                    >
                      Register
                    </Button>
                    <Button
                      onClick={() => {
                        navigate('/');
                      }}
                      className='w-[174.5px] gap-[8px] p-[8px] bg-[#6936F2] rounded-full'
                    >
                      Login
                    </Button>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </>
        )}
      </div>

      {/* ////////////////////
       This is the desktop version of the navbar 
        //////////////////// */}
      <div className='hidden sm:flex flex-row w-full justify-between items-center'>
        <button onClick={() => navigate('/home')} className='cursor-pointer'>
          <img src={Lazy} alt='logo' className='w-[137px] h-[36px]' />
        </button>
        <Popover open={keyword.length > 0}>
          <PopoverTrigger className='flex w-[300px] sm:w-[400px]'>
            <Searchbar keyword={keyword} setKeyword={setKeyword} />
          </PopoverTrigger>
          <PopoverContent className='hidden sm:flex w-[491px] gap-[24px] p-[20px] bg-[#0A0D12] border border-[#181D27] rounded-[20px]'>
            {isLoading ? (
              <p className='text-white'>Please wait a moment...</p>
            ) : (
              <>
                {users.length === 0 ? (
                  <p className='text-white'>No results</p>
                ) : (
                  <ScrollArea className='h-[384px]'>
                    <div className='flex flex-col gap-[16px]'>
                      {users.map((user) => (
                        <div
                          key={user.id}
                          onClick={() => navigate(`/profile/${user.username}`)}
                          className='cursor-pointer'
                        >
                          <ProfileCard user={user} />
                        </div>
                      ))}
                      {hasNextPage && (
                        <button
                          onClick={() => fetchNextPage()}
                          className='mt-2 p-2 bg-[#6936F2] text-white rounded'
                        >
                          {isFetchingNextPage ? 'Loading...' : 'Load More'}
                        </button>
                      )}
                    </div>
                  </ScrollArea>
                )}
              </>
            )}
          </PopoverContent>
        </Popover>
        {isLoggedIn ? (
          <div className='flex flex-row gap-[13px] items-center'>
            <img
              onClick={() => {
                navigate('/profile/me');
              }}
              src={user?.avatarUrl || Man}
              alt='pfp'
              className='w-[40px] h-[40px] rounded-full'
            />
            <p className='font-bold text-base'>{user?.name}</p>
          </div>
        ) : (
          <div className='flex flex-row max-w-[272px] h-[44px] gap-[12px] items-center justify-center'>
            <Button
              onClick={() => {
                navigate('/register');
              }}
              className='w-full gap-[8px] p-[8px] bg-none border-[1px] border-[#181D27]'
            >
              Register
            </Button>
            <Button
              onClick={() => {
                navigate('/');
              }}
              className='w-full gap-[8px] p-[8px] bg-[#6936F2]'
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Navbar;
