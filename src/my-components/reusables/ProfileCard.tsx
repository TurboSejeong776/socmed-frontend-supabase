import type { SearchUser } from '@/types/user-type';
import Man from '@/assets/pfppl.png';

type ProfCardProps = {
  user: SearchUser;
};

const ProfileCard: React.FC<ProfCardProps> = ({ user }) => {
  return (
    <section className='flex flex-row min-w-[245px] w-full gap-[8px] bg-transparent text-white'>
      <img
        src={user?.avatarUrl || Man}
        alt='pfp'
        className='w-[48px] h-[48px] rounded-full'
      />
      <div className='flex flex-col w-auto'>
        <p className='font-bold text-sm sm:text-base sm:tracking-tight'>
          {user?.name}
        </p>
        <p className='text-sm tracking-tight sm:text-base text-[#A4A7AE]'>
          {user?.username}
        </p>
      </div>
    </section>
  );
};

export default ProfileCard;
