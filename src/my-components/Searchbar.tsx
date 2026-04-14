import { SearchIcon, CircleX } from 'lucide-react';

type SearchProps = {
  keyword: string;
  setKeyword: (val: string) => void;
};

const Searchbar: React.FC<SearchProps> = ({ keyword, setKeyword }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      id='searchBaseBody'
      className='flex flex-row w-full sm:w-[491px] h-[48px] rounded-full border-[1px] border-[#0A0D12] bg-[#0A0D12] px-[16px] py-[8px] gap-[6px] text-[#535862] items-center justify-center'
    >
      <SearchIcon className='w-[24px] h-[24px]  text-[#535862]' />
      <input
        type='text'
        placeholder='Search'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className={`w-full h-[28px] text-sm sm:text-[16px] bg-transparent outline-none tracking-tight ${
          keyword ? 'text-white' : 'text-[#535862]'
        }`}
      />
      {keyword && (
        <button
          type='button'
          onClick={() => setKeyword('')}
          className='flex items-center justify-center'
        >
          <CircleX className='w-[24px] h-[24px]  text-[#535862]' />
        </button>
      )}
    </form>
  );
};

export default Searchbar;
