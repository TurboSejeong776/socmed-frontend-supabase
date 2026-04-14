import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMyProfile, updateMyProfileX } from '@/api/profile-api';
import { useNavigate } from 'react-router';

import type { UpdateProfile, ProfileResponse } from '@/types/profile-types';

import UploadPFP from '@/my-components/ImageForm2';

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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

import ProfileNavbar from '@/my-components/ProfileNavbar';

import { ArrowLeft } from 'lucide-react';

const EditSchema = z.object({
  name: z.string().min(5, {
    message: '',
  }),
  username: z.string().min(5, {
    message: '',
  }),
  phone: z.string().regex(/^08\d{8,11}$/, {
    message: 'Please enter a valid Indonesian phone number',
  }),
  avatarUrl: z.string().nullable().optional(),
  bio: z.string().min(5, {
    message: '',
  }),
});

type EditValues = z.infer<typeof EditSchema>;

const EditProfile = () => {
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarURL, setAvatarURL] = useState<string | undefined>();
  const { data: profileData } = useQuery<ProfileResponse>({
    queryKey: ['myProfile'],
    queryFn: getMyProfile,
  });

  const form = useForm<EditValues>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      name: '',
      username: '',
      phone: '',
      bio: '',
      avatarUrl: '',
    },
  });

  useEffect(() => {
    if (profileData?.data.profile) {
      form.reset({
        name: profileData.data.profile.name ?? '',
        username: profileData.data.profile.username ?? '',
        phone: profileData.data.profile.phone ?? '',
        bio: profileData.data.profile.bio ?? '',
        avatarUrl: profileData.data.profile.avatarUrl ?? null,
      });
    }
  }, [profileData, form]);

  useEffect(() => {
    if (!avatarFile) {
      setAvatarURL(undefined);
      return;
    }
    const url = URL.createObjectURL(avatarFile);
    setAvatarURL(url);
    return () => URL.revokeObjectURL(url);
  }, [avatarFile]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateProfile & { avatar?: File | null }) =>
      updateMyProfileX(data),
    onSuccess: () => {
      toast.success('Profile updated!');
      form.reset(form.getValues());
    },
    onError: () => toast.error('Failed to update profile'),
  });

  const onSubmit = (values: EditValues) => {
    mutate({
      name: values.name,
      username: values.username,
      phone: values.phone,
      bio: values.bio ?? null,
      avatarUrl: values.avatarUrl ?? null,
      avatar: avatarFile,
    });
  };

  return (
    <section className='flex flex-col w-screen min-h-screen bg-black text-white items-center'>
      <ProfileNavbar />
      <div className='flex flex-col w-[361px] gap-[16px] mt-[24px] bg-black text-white sm:w-[800px] sm:gap-[32px]'>
        <div
          id='desktopExclusive'
          className='hidden sm:flex flex-row gap-[12px] items-center'
        >
          <ArrowLeft
            onClick={() => navigate(-1)}
            className='w-[32px] h-[32px] cursor-pointer'
          />
          <p className='font-bold text-[24px] leading-[36px]'>Edit Profile</p>
        </div>
        <div className='flex flex-col w-full gap-[16px] sm:gap-[48px] sm:flex-row'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col w-full gap-[16px] sm:gap-[48px] sm:flex-row items-center'
            >
              <FormField
                control={form.control}
                name='avatarUrl'
                render={({ field }) => (
                  <UploadPFP
                    file={avatarFile}
                    defaultUrl={avatarURL ?? field.value ?? undefined}
                    onChange={(file) => setAvatarFile(file)}
                  />
                )}
              />
              <div className='flex flex-col w-full gap-[16px]'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-bold tracking-tight'>
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='string'
                          placeholder='Name'
                          className='text-[#535862] text-base tracking-tight w-full h-[48px] bg-[#0A0D12] border-[1px] border-[#181D27]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-bold tracking-tight'>
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='string'
                          placeholder='Username'
                          className='text-[#535862] text-base tracking-tight w-full h-[48px] bg-[#0A0D12] border-[1px] border-[#181D27]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-bold tracking-tight'>
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Phone'
                          className='text-[#535862] text-base tracking-tight w-full h-[48px] bg-[#0A0D12] border-[1px] border-[#181D27]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='bio'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder='Write your bio...' {...field} />
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
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
