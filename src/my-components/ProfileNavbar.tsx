import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import Searchbar from './Searchbar';

import { Button } from '@/components/ui/button';

import { ArrowLeft } from 'lucide-react';

import Lazy from '@/assets/LazyLogo.png';
import Man from '@/assets/pfppl.png';

const ProfileNavbar = () => {
  const navigate = useNavigate();
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
  return (
    <section className='flex flex-row w-full h-[64px] border-b-[1px] border-b-[#181D27] bg-black text-white px-[16px] justify-between sm:h-[80px] sm:px-[120px]'>
      {/* ////////////////////
       This is the mobile version of the navbar 
        //////////////////// */}
      <div
        id='mobileVersion'
        className='flex flex-row w-full sm:hidden justify-between items-center'
      >
        <div className='flex flex-row w-full gap-[8px] items-center'>
          <Button
            onClick={() => navigate(-1)}
            className='w-[24px] h-[24px] bg-transparent'
          >
            <ArrowLeft className='!w-[20px] !h-[20px]' />
          </Button>
          <p className='font-bold text-base'>{user?.name}</p>
        </div>
        <img
          src={user?.avatarUrl || Man}
          alt='pfp'
          className='w-[40px] h-[40px] rounded-full'
        />
      </div>

      {/* ////////////////////
       This is the desktop version of the navbar 
        //////////////////// */}
      <div className='hidden sm:flex w-full justify-between items-center'>
        <button onClick={() => navigate('/home')} className='cursor-pointer'>
          <img src={Lazy} alt='logo' className='w-[137px] h-[36px]' />
        </button>
        <Searchbar keyword={keyword} setKeyword={setKeyword} />
        {isLoggedIn ? (
          <div className='flex flex-row gap-[13px] items-center'>
            <img
              src={Man}
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

export default ProfileNavbar;
