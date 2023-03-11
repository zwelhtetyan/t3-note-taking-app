'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FormEvent } from 'react';

export default function Login() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const user = {
      email: formData.get('email') || '',
      password: formData.get('password') || '',
    };

    await signIn('credentials', { ...user, callbackUrl: '/' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center justify-center h-screen space-y-3'
    >
      <input
        type='email'
        name='email'
        placeholder='email'
        className='bg-gray-200 p-2 rounded'
      />

      <input
        type='password'
        name='password'
        placeholder='password'
        className='bg-gray-200 p-2 rounded'
      />

      <div className='flex space-x-2'>
        <p>If you don&apos;t have an account?</p>
        <Link href='/auth/register' className='text-blue-700'>
          Register
        </Link>
      </div>

      <button className='bg-zinc-800 text-white p-2 px-3 rounded'>Login</button>
    </form>
  );
}
