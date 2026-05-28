import { useNavigate, useLocation } from 'react-router';
import { House, UserRound, Plus } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hiddenPaths = ['/', '/register', '/post/new'];
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }
  return (
    <section className='flex fixed bottom-[16px] left-1/2 -translate-1/2 items-center justify-center flex-row w-[345px] sm:w-[360px] h-[64px] sm:h-[80px] gap-[45px] bg-[#0A0D12] border-[1px] border-[#181D27] rounded-[1000px] text-white'>
      <button
        onClick={() => {
          navigate('/home');
        }}
        className='flex flex-col w-[94px] gap-[2px] items-center justify-center hover:bg-white/10 hover:scale-105 hover:rounded-2xl hover:px-2 hover:py-2 transition-transform'
      >
        <House className='w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]' />
        <p className='font-bold text-xs sm:text-base sm:tracking-tight'>Home</p>
      </button>
      <button
        onClick={() => {
          navigate('/new');
        }}
        className='flex flex-col w-[44px] h-[44px] rounded-full p-[7.33px] gap-[7.33px] bg-[#6936F2] items-center justify-center hover:bg-[#8158ef] hover:scale-125 hover:px-2 hover:py-2 transition-transform'
      >
        <Plus className='w-[22px] h-[22px] sm:w-[24px] sm:h-[24px]' />
      </button>
      <button
        onClick={() => {
          navigate('/profile/me');
        }}
        className='flex flex-col w-[94px] gap-[2px] items-center justify-center hover:bg-white/10 hover:scale-105 hover:rounded-2xl hover:px-2 hover:py-2 transition-transform'
      >
        <UserRound className='w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]' />
        <p className='font-bold text-xs sm:text-base sm:tracking-tight'>
          Profile
        </p>
      </button>
    </section>
  );
};

export default Navigation;
