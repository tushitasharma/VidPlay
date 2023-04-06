import React, { useEffect } from 'react';
import {useParams} from 'react-router';
import Video from './Video'
import './VideoPlayer.css';
import RecommendedVideos from './recommended';
import VideoInfo from './VideoInfo';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { Comment } from './Comment';
import { CommentsHeader } from './CommentHeader';
import { loadVideoData, fetchComments } from '../store/actions';

const VideoPlayer = () => {
    let { videoId } = useParams();
    const dispatch = useDispatch();
    const {videoInfo, isLoading, isError} = useSelector(state => state.video);
    const {comments, isCommentLoading } = useSelector(state => state.comments);

    useEffect(() => {
        dispatch(loadVideoData(videoId));
        dispatch(fetchComments(videoId));
    }, [videoId, dispatch])

    const allComments = comments?.items?.map((comment) => {
      return <Comment comment={comment} key={comment.id}/>
    });

    if(isError) {
        return <Alert severity="error" className='loading'>No Results found!</Alert>
    }
    return (
        <div className='videoplayer'>
            <div className='videoplayer__videodetails'>
                <div className='videoplayer__video'>
                    {isLoading ? <div className='loading'><CircularProgress className='loading' color='secondary'/></div> : <Video videoId={videoId} /> }
                </div>
                <div className='videoplayer__videoinfo'>
                    {!isLoading && videoInfo ? <VideoInfo
                                    title={videoInfo.snippet}
                                    description={videoInfo.description}
                                    publishedDate={videoInfo.publishedDate}
                                    channelTitle={videoInfo.channelTitle}
                                    channelImage={videoInfo.channelImage}
                                    viewCount={videoInfo.viewCount}
                                    likeCount={videoInfo.likeCount}
                                    dislikeCount={videoInfo.dislikeCount}
                                    subs={videoInfo.subs}
                                  /> : null
                    }
                </div>
                <div>
                    {isCommentLoading ? <div className='loading'><CircularProgress className='loading' color='secondary'/></div> : (
                        <div className='comment-section'>
                            <CommentsHeader amountComments={comments.pageInfo.totalResults}/>
                            {allComments}
                        </div>
                    )}
                </div>
            </div>
            <div className='videoplayer__suggested'>
                <RecommendedVideos />
            </div>
        </div>
    )
}

export default VideoPlayer;
