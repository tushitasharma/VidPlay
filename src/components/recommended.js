
import React, { useState, useEffect } from 'react';
import VideoCard from './Videocard';
import './recommended.css';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector, useDispatch } from 'react-redux';
import { loadHomePageData } from '../store/actions';


const RecommendedVideos = () => {

  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
    const dispatch = useDispatch();
    const {
      videoCards,
      isLoading,
      isError,
    } = useSelector(state => state.home);

    useEffect(() => {
      dispatch(loadHomePageData())
    }, [dispatch])

    const getPopularVideos = async () => {
      if (isPaginationLoading) return;
      setIsPaginationLoading(true)
      await dispatch(loadHomePageData());
      setIsPaginationLoading(false);
    }
    let shouldGetMoreResults =
    (200 - videoCards?.length) / 16 >= 1
  
    if(isError) {
      return <Alert severity="error" className='loading'>No Results found!</Alert>
    }
    return (
        
        <div className='recommendedvideos'>
            { isLoading ? 
            <div className='loading'>
                <CircularProgress color='secondary' /> 
            </div> : null }
              <InfiniteScroll
                dataLength={videoCards.length}
                next={getPopularVideos}
                hasMore={shouldGetMoreResults}
                loader={!isLoading && <div className='loading'><CircularProgress color='secondary' /></div> }
                // overflow: auto from infinite scroll default causes scrolling problem
                style={{ overflow: 'unset' }}
              >
            <div className="recommendedvideos__videos">
                {
                  videoCards?.map(item => {
                    return (
                      <>
                        <Link key={item.videoId} to={`/video/${item.videoId}`}>
                            <VideoCard key={item.videoId}
                                title={item.title}
                                image={item.image}
                                views={item.views}
                                timestamp={item.timestamp}
                                channel={item.channel}
                                channelImage={item.channelImage}
                            />
                        </Link>
                      </>
                    )
                  })
                }
              </div>
            </InfiniteScroll>
        </div>
    )
}

export default RecommendedVideos;
