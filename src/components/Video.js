import React from 'react';
import YouTube from 'react-youtube';
import './Video.css';

const Video = ({videoId}) => {
    return (
        <div>
          <YouTube
            videoId={videoId}
            iframeClassName='youtube-video'
          />
        </div>
    )
}

export default Video;
