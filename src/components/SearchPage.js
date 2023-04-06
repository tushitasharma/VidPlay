import React, { useEffect} from 'react';
import "./SearchPage.css";
import TuneIcon from '@material-ui/icons/Tune';
import { useSelector, useDispatch } from 'react-redux';
import ChannelRow from './ChannelCard';
import VideoRow from './SearchVideoCard';
import {useParams} from 'react-router';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { loadSearchPageData } from '../store/actions';


const SearchPage = (props) => {
    let { searchQuery } = useParams();
    const dispatch = useDispatch();
    const { channelRow, videoRows, isLoading, isError } = useSelector(state => state.search);
  
    useEffect(() => {
      dispatch(loadSearchPageData(searchQuery));
    }, [searchQuery, dispatch])

    if (isError) {
      return <Alert severity="error" className='loading'>No Results found!</Alert>
    }
    return (
        <div className="searchpage">
            <div className="searchpage__filter">
                <TuneIcon />
                <h2>Filter</h2>
            </div>
            { isLoading ? 
            <div className='loading'>
                <CircularProgress color='secondary' /> 
            </div> : null }
            <hr />
            { !isLoading && channelRow ? <ChannelRow 
                                  key={channelRow.channelId}
                                  image={channelRow.image}
                                  channel={channelRow.title}
                                  subs={channelRow.subs}
                                  noOfVideos={channelRow.noOfVideos}
                                  description={channelRow.description}
                            /> : null
            }
            <hr />
            {
              videoRows?.map(item => {
                return (
                    <Link key={item.videoId} to={`/video/${item.videoId}`}>
                        <VideoRow
                        title={item.title}
                        image={item.image}
                        views={item.views}
                        timestamp={item.timestamp}
                        channel={item.channel}
                        description={item.description}
                        />
                    </Link>
                )
              })
              
            }   
            
        </div>
    )
}

export default SearchPage;
