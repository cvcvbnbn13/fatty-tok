import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { createOrGetUser } from '@utils/index';
import useAuthStore from '@store/authStore';

import Logo from '../../utils/FattyTok-logo.png';

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();

  const router = useRouter();

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }

    setSearchValue('');
  };

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[40px] md:w-[75px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="logo"
            layout="responsive"
          />
        </div>
      </Link>

      <div className="relative hidden md:block">
        <form
          action=""
          onSubmit={handleSearch}
          className="absolute md:static top-10 left-20 bg-white "
        >
          <input
            type="text"
            value={searchValue}
            onChange={e => {
              setSearchValue(e.target.value);
            }}
            placeholder="搜尋"
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-3 focus:border-gray-300 w-[300px] md:w-[350px] rounded-3xl md:top-0"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 py-1 md:px-4 text-md font-semibold flex items-center gap-2 rounded-3xl">
                <IoMdAdd className="text-xl" /> {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={userProfile.image}
                    alt={'頭像'}
                  />
                </>
              </Link>
            )}
            <button className="px-2">
              <AiOutlineLogout
                color="red"
                fontSize={21}
                onClick={() => {
                  googleLogout();
                  removeUser();
                }}
              />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={res => createOrGetUser(res, addUser)}
            onError={() => console.log('Error')}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
