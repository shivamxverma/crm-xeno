"use client"
import React, { useEffect, useState } from 'react'
import useIsMobile from '../hooks/useMobile';
import useAuthStore from '../store/useAuthStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TextShimmer } from '@/components/ui/text-shimmer';
import { WorldMap } from '@/components/ui/world-map';
import '@ant-design/v5-patch-for-react-19';
import { Spin } from 'antd';
const Page = () => {
    const isMobile = useIsMobile();
    const [currUser, setCurrUser] = useState<any>(null);
    const {isLoggedIn, user} = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      const token = sessionStorage.getItem('googleIdToken');
      if (!isLoggedIn && token) {
        
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
          useAuthStore.setState({
            isLoggedIn: true,
            user: JSON.parse(storedUser),
          });
        }
        
      } else if (!token) {
        router.push('/');
      }
    }, []);
    


    if (isMobile) {
      return (
        <div className="h-screen flex items-center px-10 justify-center bg-black text-white text-xl">
          Please switch to a desktop device for the best experience.
        </div>
      );
    }

    if(!user){
      return <div className='h-screen flex items-center px-10 justify-center text-xl'>
        <Spin size="large" />

      </div>
    }
  return (
    <div className='h-screen flex  px-10 justify-center text-xl overflow-hidden'>
        <div className='flex flex-col items-center mt-10 gap-7 mb-4 w-full '>
        {user?.avatarUrl ? (
            <Image 
                className='rounded-full' 
                src={user.avatarUrl} 
                width={100} 
                height={100} 
                alt={user.name ? `${user.name}'s avatar` : 'User avatar'} 
            />
        ) : (

            <div className="w-[100px] h-[100px] rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-sm">No Avatar</span>
            </div>
        )}
        <p>Welcome ! {user?.name}</p>
        <TextShimmer
      duration={1.2}
      className='
      h-20
      w-[50%]
      left-32 

      text-5xl font-medium [--base-color:theme(colors.violet.500)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]'
    >
      Hi, how are you?
    </TextShimmer>
  
        <WorldMap
        
        dots={[
          {
            start: {
              lat: 64.2008,
              lng: -149.4937,
            }, // Alaska (Fairbanks)
            end: {
              lat: 34.0522,
              lng: -118.2437,
            }, // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
        ]}
      />
        </div>
        </div>




  )
}

export default Page