'use client'
import React from 'react';
import AnimateToView from './AnimateToView';
import LoadingButton from './Button/LoadingButton';
import Link from 'next/link'; // Use Link from next/link for navigation

export default function About() {
  return (
    <>
    <div className='md:block lg:flex items-center justify-center px-8'>
      <div className="md:py-20 py-10 px-4  md:px-16">
        <AnimateToView className=" w-full">
          <h1 className="md:text-[30px] text-[30px] px-2 md:px-0 text-DG">We handle everything for you.</h1>
        </AnimateToView>
        <div className="flex mt-5">
          <div>
            <AnimateToView className=" w-full">
              <p className="text-DG ml-8 text-lg md:text-xl font-light">
                <strong className="font-semibold">Solve Agri Pak:</strong>{" "}
                Empowering livestock success through proven solutions and community
                development. We assist farmers in optimizing productivity and
                resources. Our commitment lies in sustainable practices, fostering
                community growth, and ensuring animal welfare. Trust us as your
                partner for livestock excellence.
              </p>
            </AnimateToView>
            <AnimateToView className="grid grid-cols-2 md:grid-cols-4 gap-16 mt-12 ">
              <div>
                <h1 className="text-[24px] text-DG">100K+</h1>
                <p className="text-lg md:text-xl font-light text-DG">Customers</p>
              </div>
              <div>
                <h1 className="text-[24px] text-DG">50+</h1>
                <p className="text-lg md:text-xl font-light text-DG">Products</p>
              </div>
              <div>
                <h1 className="text-[24px] text-DG">1000+</h1>
                <p className="text-lg md:text-xl font-light text-DG">Consultancies</p>
              </div>
              <div>
                <h1 className="text-[24px] text-DG">100+</h1>
                <p className="text-lg md:text-xl font-light text-DG">Projects</p>
              </div>
            </AnimateToView>
            <div className=" max-w-[200px] mt-10">
              <Link href="/aboutus" passHref>
                <LoadingButton isLoading={false} text="See Company"  />
              </Link>
            </div>
          </div>
        </div>

        
      </div>
      <img className='w-screen lg:w-full pb-5 lg:pb-0' src="/aboutt.png" alt="" />
      </div>
    </>
  );
}
