import { login } from '@/api/auth-api';
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

const logiSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  pass: z.string().min(5, {
    message:
      'Pretty sure we put a safeguard that says "minimum of 5 character" during registry.',
  }),
});

const Logi = () => {
  const navigate = useNavigate();
  const logiForm = useForm<z.infer<typeof logiSchema>>({
    resolver: zodResolver(logiSchema),
    defaultValues: {
      email: '',
      pass: '',
    },
  });

  const onLogin = async (data: z.infer<typeof logiSchema>) => {
    try {
      const res = await login({ email: data.email, password: data.pass });
      sessionStorage.setItem('auth', JSON.stringify(res));
      console.log('login response', res);
      toast('Welcome back!', {
        style: {
          background: '#079455',
          color: '#FAFAFA',
        },
      });
      navigate('/Home');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const response = err.response?.data as {
          message?: string;
          errors?: string[];
        };
        toast(
          response?.message || response?.errors?.join('\n') || 'Login failed',
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
    <section className='flex flex-col w-screen h-screen item-center bg-black'>
      <div
        id='base'
        className='flex flex-col w-[345px] h-auto sm:w-[523px] m-auto gap-[16px] sm:gap-[24px]  text-white rounded-[16px] bg-black/20 border-[1px] border-[#181D27] px-[16px] py-[32px] sm:px-[24px] sm:py-[40px] z-10 items-center justify-center'
      >
        <img
          src={Lazy}
          alt='Booky here!'
          className='w-[137px] h-[36px] -mb-[2px]'
        />

        <p className='font-bold text-[24px] leading-[36px] text-white'>
          Welcome Back!
        </p>

        <Form {...logiForm}>
          <form
            onSubmit={logiForm.handleSubmit(onLogin)}
            className='flex flex-col w-full gap-[16px] sm:gap-[20px]'
          >
            <FormField
              control={logiForm.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-bold tracking-tight'>
                    E-mail
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='string'
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
              control={logiForm.control}
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
            <Button
              type='submit'
              onClick={() => {}}
              className='bg-[#6936F2] hover:bg-[#7d4eff] w-full h-[44px] sm:h-[48px] flex !rounded-full p-[8px] gap-[8px] !font-bold !text-sm sm:text-base tracking-tight text-white'
            >
              Login
            </Button>
          </form>

          <div className='flex flex-row w-full items-center justify-center gap-[4px]'>
            <p className='font-semibold text-sm'>Don't have an account?</p>
            <button
              onClick={() => navigate('/register')}
              className='!font-semibold !text-sm  text-[#7F51F9] cursor-pointer'
            >
              Register
            </button>
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

export default Logi;
