"use client";

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GetMailComponent from '../components/getMailComponent';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session && status !== 'loading') {
      router.push("/");
    }
  }, [session, status, router]);


  if (status === "loading") {
    return <div>Loading...</div>;
  }
    return (
      <div className='w-full h-full p-4'>
          <div className='w-full h-full mt-8'>
            <GetMailComponent />
          </div>
      </div>
    );
  
}

