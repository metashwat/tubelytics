// components/VideoList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/getVideos');
        setVideos(response.data);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      {videos.map((video) => (
        <div key={video.id}>
          <h3>{video.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
