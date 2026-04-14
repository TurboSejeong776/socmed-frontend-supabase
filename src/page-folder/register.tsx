import { register } from '@/api/auth-api';
import { AxiosError } from 'axios';

import { useNavigate } from 'react-router-dom';

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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import Lazy from '@/assets/LazyLogo.png';
import BG from '@/assets/GraBG.png';

const regiSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Username must be at least 2 characters.' }),
    username: z
      .string()
      .min(2, { message: 'Username must be at least 2 characters.' }),
    email: z.email({ message: 'Invalid email address' }),
    phone: z.string().regex(/^08\d{8,11}$/, {
      message: 'Please enter a valid Indonesian phone number',
    }),
    pass: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    conpass: z
      .string()
      .min(6, { message: 'Confirmed password must be at least 6 characters.' }),
  })
  .refine((data) => data.pass === data.conpass, {
    message: 'Passwords do not match',
    path: ['conpass'],
  });

const Regi = () => {
  const navigate = useNavigate();

  const regiForm = useForm<z.infer<typeof regiSchema>>({
    resolver: zodResolver(regiSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      phone: '',
      pass: '',
      conpass: '',
    },
  });

  const onRegister = async (data: z.infer<typeof regiSchema>) => {
    const payload = {
      name: data.name,
      username: data.username,
      email: data.email,
      phone: String(data.phone),
      password: data.pass,
    };

    console.log('Register payload:', payload);

    try {
      await register(payload);
      toast(`Registration success! Welcome! `, {
        style: {
          background: '#079455',
          color: '#FAFAFA',
        },
      });
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const response = err.response?.data as {
          message?: string;
          errors?: Array<{ field?: string; message: string }>;
        };
        console.error('Registration error payload:', response);
        if (response?.errors?.length) {
          response.errors.forEach((e) =>
            console.error(
              `Field: ${e.field ?? 'unknown'}, Message: ${e.message}`
            )
          );
        }
        toast(
          response?.message ||
            response?.errors?.map((e) => e.message).join('\n') ||
            'Registration failed',
          {
            style: {
              background: '#D9206E',
              color: '#FAFAFA',
            },
          }
        );
      } else if (err instanceof Error) {
        toast(err.message, {
          style: {
            background: '#D9206E',
            color: '#FAFAFA',
          },
        });
      } else {
        toast('Dunno man, some error I guess', {
          style: {
            background: '#D9206E',
            color: '#FAFAFA',
          },
        });
      }
    }
  };

  return (
    <section className='flex flex-col w-screen h-screen item-center bg-black text-white'>
      <div
        id='base'
        className='flex flex-col w-[345px] h-[746px] sm:w-[523px] sm:h-auto m-auto gap-[16px] sm:gap-[24px]  text-white rounded-[16px] bg-black/20 border-[1px] border-[#181D27] px-[16px] py-[32px] sm:px-[24px] sm:py-[40px] z-10 items-center'
      >
        <img
          src={Lazy}
          alt='Sociality here!'
          className='w-[137px] h-[36px] -mb-[2px]'
        />

        <p className='font-bold text-[24px] leading-[36px] text-white'>
          Register
        </p>

        <Form {...regiForm}>
          <div className='flex flex-col w-full gap-[20px] items-baseline'>
            <form
              onSubmit={regiForm.handleSubmit(onRegister)}
              className='flex flex-col w-full gap-[16px] sm:gap-[20px]'
            >
              <FormField
                control={regiForm.control}
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
                control={regiForm.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-bold tracking-tight'>
                      Username
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
                control={regiForm.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-bold tracking-tight'>
                      E-mail
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='Email'
                        className='text-[#535862] text-base tracking-tight w-full h-[48px] bg-[#0A0D12] border-[1px] border-[#181D27]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={regiForm.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-bold tracking-tight'>
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='string'
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
                control={regiForm.control}
                name='pass'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-bold tracking-tight'>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Password'
                        className='text-[#535862] text-base tracking-tight w-full h-[48px] bg-[#0A0D12] border-[1px] border-[#181D27]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={regiForm.control}
                name='conpass'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-bold tracking-tight'>
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Confirm password'
                        className='text-[#535862] text-base tracking-tight w-full h-[48px] bg-[#0A0D12] border-[1px] border-[#181D27]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='bg-[#6936F2] hover:bg-[#7d4eff] w-full h-[44px] sm:h-[48px] flex !rounded-full p-[8px] gap-[8px] !font-bold text-sm sm:text-base tracking-tight text-white'
              >
                Register
              </Button>
            </form>

            <div className='flex flex-row w-full items-center justify-center gap-[4px]'>
              <p className='font-semibold text-sm'>Already have an account?</p>
              <button
                onClick={() => navigate('/')}
                className='font-semibold text-sm text-[#7F51F9] cursor-pointer'
              >
                Log In
              </button>
            </div>
          </div>
        </Form>
      </div>
      <img
        src={BG}
        className='fixed bottom-0 left-1/2 -translate-x-1/2  w-[414.56px] h-[233.19px] overflow-hidden sm:w-[1920px] sm:h-[1080px]'
        alt='Background'
      />
    </section>
  );
};

export default Regi;
