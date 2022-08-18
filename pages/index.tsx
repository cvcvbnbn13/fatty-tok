import type { NextPage } from 'next';
import React from 'react';
import axios from 'axios';
import { Video } from '../types';
import { NoResults, VideoCard } from '@components';
import { BASE_URL } from '@utils/index';

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResults text={'No videos'} />
      )}
    </div>
  );
};

// If you export a function called getServerSideProps (Server-Side Rendering) from a page, Next.js will pre-render this page on each request using the data returned by getServerSideProps.
// You should use getServerSideProps only if you need to render a page whose data must be fetched at request time.
export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let res = null;
  if (topic) {
    res = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    res = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: res.data,
    },
  };
};

export default Home;
