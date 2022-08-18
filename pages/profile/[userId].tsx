import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import { NextPage } from 'next';

import { VideoCard, NoResults } from '@components';

import { IUser, Video } from '../../types';

import { BASE_URL } from '@utils/index';

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile: NextPage<IProps> = ({ data }) => {
  const { user, userVideos, userLikedVideos } = data;
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videoList, setVideoList] = useState<Video[]>([]);

  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
  const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';

  useEffect(() => {
    if (showUserVideos) {
      setVideoList(userVideos);
    } else {
      setVideoList(userLikedVideos);
    }
  }, [showUserVideos, userLikedVideos, userVideos]);

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            src={user.image}
            width={120}
            height={120}
            className="rounded-full"
            alt="user 頭像"
            layout="responsive"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase">
            {user.userName.replaceAll(' ', '')}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="capitalize md:text-xl text-gray-400 text-xs">
            {user.userName}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos} `}
            onClick={() => {
              setShowUserVideos(true);
            }}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked} `}
            onClick={() => {
              setShowUserVideos(false);
            }}
          >
            Liked
          </p>
        </div>

        <div className="flex gap-6 flex-wrap md:justify-start">
          {videoList?.length > 0 ? (
            videoList.map((item: Video) => (
              <VideoCard post={item} key={item._id} />
            ))
          ) : (
            <NoResults text={`No ${showUserVideos ? '' : 'Liked'}Videos Yet`} />
          )}
        </div>
      </div>
    </div>
  );
};

// getServerSideProps 在跟 component 同一個檔案 export 一個 async 的 function，然後回傳的 props 就會注入到 component 中，讓 Next.js 幫我們做 SSR

export const getServerSideProps = async ({
  // 就是[userId].tsx的userId
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);

  return {
    props: { data: res.data },
  };
};

export default Profile;
