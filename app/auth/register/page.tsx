'use client';

import { axiosInstance } from '@/lib/axios';
import Link from 'next/link';
import { FormEvent } from 'react';

export default function Register() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const user = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      password: formData.get('password') || '',
    };

    try {
      await axiosInstance.post('/auth/user/create', user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center justify-center h-screen space-y-3'
    >
      <input
        type='text'
        placeholder='user name'
        className='bg-gray-200 p-2 rounded'
        name='name'
      />

      <input
        type='email'
        placeholder='email'
        className='bg-gray-200 p-2 rounded'
        name='email'
      />

      <input
        type='password'
        placeholder='password'
        className='bg-gray-200 p-2 rounded'
        name='password'
      />

      <div className='flex space-x-2'>
        <p>Already have an account?</p>
        <Link href='/auth/login' className='text-blue-700'>
          Login
        </Link>
      </div>

      <button className='bg-zinc-800 text-white p-2 px-3 rounded'>
        Register
      </button>
    </form>
  );
}
