import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';

type UploadImageProps = {
  file: File | null;
  defaultUrl?: string;
  onChange: (file: File | null) => void;
};

const UploadPFP = ({ file, defaultUrl, onChange }: UploadImageProps) => {
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | undefined>(defaultUrl);

  useEffect(() => {
    if (!file) {
      setPreview(defaultUrl);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url); // cleanup
  }, [file, defaultUrl]);

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

  return (
    <section className='flex flex-col w-[160px] h-[136px] gap-[16px] justify-center  items-center'>
      {preview && (
        <img
          src={preview}
          alt='Image Preview'
          className='w-[80px] h-[80px] object-contain rounded-full'
        />
      )}

      <Button
        type='button'
        onClick={triggerUpload}
        className={`flex flex-col w-[160px] h-[40px] border-[1px] px-[16px] py-[8px] text-center rounded-xl gap-[8px] ${
          error ? 'border-red-500' : 'border-[#181D27]'
        }`}
      >
        {preview ? 'Change Photo' : 'Upload Photo'}
      </Button>

      <input
        id='coverInput'
        type='file'
        accept='.jpg,.jpeg,.png'
        className='hidden'
        onChange={handleUpload}
      />

      {error && <p className='text-[#EE1D52] text-[12px]'>{error}</p>}
    </section>
  );
};

export default UploadPFP;
