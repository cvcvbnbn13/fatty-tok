import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { VideoCard, NoResults } from '@components';
import { IUser, Video } from '../../types';
import { BASE_URL } from '@utils/index';
import useAuthStore from '@store/authStore';

interface IProps {
  videos: Video[];
}

const Search: NextPage<IProps> = ({ videos }) => {
  const [isAccounts, setIsAccounts] = useState(false);

  const router = useRouter();
  const { searchTerm }: any = router.query;

  const { allUsers } = useAuthStore();

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full ">
      <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts} `}
          onClick={() => {
            setIsAccounts(true);
          }}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos} `}
          onClick={() => {
            setIsAccounts(false);
          }}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser) => (
              <Link href={`/profile/${user._id}`} key={user._id}>
                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="user ??????"
                    />
                  </div>
                  <div className="hidden xl:block">
                    <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                      {user.userName.replaceAll(' ', '')}
                      <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitalize text-gray-400 text-xs">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`??????????????????`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            videos.map((video: Video) => (
              <VideoCard post={video} key={video._id} />
            ))
          ) : (
            <NoResults text={`???????????? ${searchTerm} ??????`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  // ??????[userId].tsx???userId
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(
    `${BASE_URL}/api/search/${encodeURI(searchTerm)}`
  );

  return {
    props: { videos: res.data },
  };
};

export default Search;
