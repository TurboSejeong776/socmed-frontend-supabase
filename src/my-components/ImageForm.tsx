import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CloudUpload, Trash, ArrowUpToLine } from 'lucide-react';

type UploadImageProps = {
  file: File | null;
  onChange: (file: File | null) => void;
};

const UploadImage = ({ file, onChange }: UploadImageProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setError('Please pity the server, man...do not upload big image!');
      return;
    }
    setError(null);
    onChange(selectedFile);
  };

  const triggerUpload = () => {
    const input = document.getElementById('coverInput') as HTMLInputElement;
    input?.click();
  };

  const clearImage = () => {
    onChange(null);
  };

  const preview = file ? URL.createObjectURL(file) : null;

  return (
    <section className='flex flex-col w-full min-h-[174px] gap-[6px]'>
      <label className='text-[14px] font-semibold'>Cover Image</label>
      <input
        id='coverInput'
        type='file'
        accept='.jpg,.jpeg,.png'
        className='hidden'
        onChange={handleUpload}
      />

      {!file && (
        <div
          onClick={triggerUpload}
          className={`flex flex-col w-full min-h-[140px] cursor-pointer border-[1px] px-[24px] py-[16px] text-center rounded-xl gap-[4px] ${
            error ? 'border-red-500' : 'border-dashed border-[#A4A7AE]'
          }`}
        >
          <div className='flex flex-col w-full min-h-[108px] gap-[12px] items-center'>
            <CloudUpload className='w-[40px] h-[40px]' />
            <div className='flex flex-col w-full min-h-[56px] gap-[4px]'>
              <p className='text-blue-600 font-medium text-[14px]'>
                Click to upload{' '}
                <span className='text-[#414651] font-normal'>
                  or drag and drop
                </span>
              </p>
              <p className='text-sm text-[#414651]'>PNG or JPG (max. 5mb)</p>
            </div>
          </div>
        </div>
      )}

      {error && <p className='text-[#EE1D52] text-[12px]'>{error}</p>}

      {file && (
        <div className='relative flex flex-col w-full min-h-[140px] border-[1px] px-[24px] py-[16px] text-center rounded-xl gap-[4px] justify-center items-center overflow-hidden'>
          <div className='relative w-[313px] sm:w-[529px] rounded-xl overflow-hidden items-center justify-center'>
            <img
              src={preview!}
              alt='Image Preview'
              className='object-contain'
            />
          </div>
          <div className='flex flex-row w-[286px] h-[40px] justify-end gap-[12px] bg-none items-center'>
            <button
              type='button'
              className='flex flex-row w-[141px] h-[40px] bg-gray-100 rounded hover:bg-gray-300 px-[12px] gap-[6px] text-[12px] items-center border border-[#D5D7DA] text-black'
              onClick={triggerUpload}
            >
              <ArrowUpToLine className='w-[20px] h-[20px] ' />
              Change Image
            </button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className='flex flex-row w-[141px] h-[40px] bg-gray-100 rounded hover:bg-gray-300 px-[12px] gap-[6px] text-[12px] text-[#361a21] items-center justify-center border border-[#D5D7DA]'>
                  <Trash className='w-[20px] h-[20px]' />
                  Delete Image
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent className='fixed top-1/2 left-1/2 flex flex-col w-full sm:w-[537px] h-[224px] -translate-x-1/2 -translate-y-1/2 rounded-4xl bg-black p-[32px] gap-[24px] ml-[6px] mr-[6px] text-white'>
                <AlertDialogTitle className='text-[20px] font-bold'>
                  Delete
                </AlertDialogTitle>
                <AlertDialogDescription className='text-[16px] text-white'>
                  Are you sure to delete?
                </AlertDialogDescription>
                <div className='flex flex-row w-full h-[48px] gap-[8px] justify-end'>
                  <AlertDialogCancel className='w-[120px] h-[48px] rounded-full hover:bg-gray-300 text-[14px] font-semibold gap-[8px] p-[8px] text-black'>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={clearImage}
                    className='w-[171px] h-[48px] rounded-full bg-[#EE1D52] text-white hover:bg-red-400 text-[14px] font-semibold gap-[8px] p-[8px]'
                  >
                    Delete
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </section>
  );
};

export default UploadImage;
