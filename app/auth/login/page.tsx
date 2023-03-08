'use client';

import Link from 'next/link';
import { FormEvent } from 'react';

export default function Login() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center justify-center h-screen space-y-3'
    >
      <input
        type='email'
        placeholder='email'
        className='bg-gray-200 p-2 rounded'
      />
      <input
        type='password'
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
