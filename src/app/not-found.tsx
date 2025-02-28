'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import dog from '../../public/Dog Ate-big.png';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <Image 
        src={dog} 
        alt="Dog eating page" 
        className="mx-auto"
        height={220} 
        width={220}
        />
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="mt-4 text-gray-500">
          Oops! The page you’re looking seems to have been ate!
        </p>
        <Button
          onClick={() => router.push('/')}
          className="mt-6 px-6 py-2 bg-zinc-600 text-white rounded-md dark:bg-zinc-700"
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default NotFound;