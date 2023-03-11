'use client';

import { signOut } from 'next-auth/react';

export default function User() {
  return (
    <button
      className='bg-black text-white py-2 px-3 rounded'
      onClick={() => signOut()}
    >
      Logout
    </button>
  );
}
