import { useMutation } from '@tanstack/react-query';
import { createPost } from '@/api/post-api';

import { useNavigate } from 'react-router';

import UploadImage from '@/my-components/ImageForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import ProfileNavbar from '@/my-components/ProfileNavbar';

import { ArrowLeft } from 'lucide-react';

const PostSchema = z.object({
  caption: z.string().min(5, {
    message: '',
  }),
  image: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof PostSchema>;

const NewPost = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      caption: '',
      image: undefined,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log('Post created!', data);
      form.reset();
      navigate('/Home');
    },
    onError: (error) => {
      console.error('Failed to create post:', error);
    },
  });

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();

    formData.append('caption', values.caption);

    if (values.image) {
      formData.append('image', values.image);
    }

    mutate(formData);
  };
  return (
    <section className='flex flex-col w-screen h-screen bg-black text-white items-center'>
      <ProfileNavbar />
      <div className='flex flex-col w-[361px] gap-[16px] mt-[64px] bg-black text-white sm:w-[452px] sm:gap-[24px]'>
        <div
          id='desktopExclusive'
          className='hidden sm:flex flex-row gap-[12px]'
        >
          <ArrowLeft className='w-[32px] h-[32px]' />
          <p className='font-bold text-[24px] leading-[36px]'>Add Post</p>
        </div>
        <div className='flex flex-col w-full gap-[16px]'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-4'
            >
              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <UploadImage
                    file={field.value ?? null}
                    onChange={(file) => field.onChange(file ?? undefined)}
                  />
                )}
              />
              <FormField
                control={form.control}
                name='caption'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Write your caption...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='bg-[#6936F2] text-white font-bold text-sm'
                disabled={isPending}
              >
                {isPending ? "Let's gooooo!" : 'Share'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default NewPost;
