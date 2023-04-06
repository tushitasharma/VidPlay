import axios from 'axios';
import { DateTime } from 'luxon';

let newVideoCards = [];
let channelRow;
let videoRows = [];
let videoInfo;

async function createVideoCards(videoItems) {
    for (const video of videoItems) {
    const videoId = video.id;
    const snippet = video.snippet;
    const channelId = snippet.channelId;
    const response = await axios
                            .get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=AIzaSyCMy24CVD8hdXHASiAVTZUjuVzBqHdD-3o`)
    const channelImage = response.data.items[0].snippet.thumbnails.medium.url;

    const title = snippet.title;
    const image = snippet.thumbnails.medium.url;
    const views = video.statistics.viewCount;
    const timestamp = DateTime.fromISO(snippet.publishedAt).toRelative();;
    const channel = snippet.channelTitle;

    newVideoCards.push({
        videoId,
        image,
        title,
        channel,
        views,
        timestamp,
        channelImage
    });
    };
}

async function createChannelRow(channel) {
    const channelId = channel.id.channelId;
    console.log(channelId);
    const response = await axios
                            .get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=AIzaSyCMy24CVD8hdXHASiAVTZUjuVzBqHdD-3o`)
    const noOfVideos = response.data.items[0].statistics.videoCount;
    const subs = response.data.items[0].statistics.subscriberCount;
    const snippet = channel.snippet;
    const title = snippet.title;
    const description = snippet.description;
    const image = snippet.thumbnails.medium.url;
    channelRow = {
        channelId,
        image,
        title,
        subs,
        noOfVideos,
        description
    };
}

async function createVideoRows(videos) {
    for (const video of videos) {
    const videoId = video.id.videoId;
    const response = await axios
                            .get(`https://www.googleapis.com/youtube/v3/videos?part=statistics%2C%20snippet&id=${videoId}&key=AIzaSyCMy24CVD8hdXHASiAVTZUjuVzBqHdD-3o`)
    const views = response.data.items[0].statistics.viewCount;
    const snippet = video.snippet;
    const title = snippet.title;
    const timestamp = DateTime.fromISO(snippet.publishedAt).toRelative();
    const channel = snippet.channelTitle;
    const description = snippet.description;
    const image = snippet.thumbnails.medium.url;
                        
    videoRows.push({
        videoId,
        title,
        image,
        views,
        timestamp,
        channel, 
        description
    });
    };
}


async function createVideoInfo (video) {
    const snippet = video.snippet;
    const stats = video.statistics;
    const channelId = snippet.channelId;
    const response = await axios
                            .get(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2C%20statistics&id=${channelId}&key=AIzaSyCMy24CVD8hdXHASiAVTZUjuVzBqHdD-3o`)
    
    const channelImage = response.data.items[0].snippet.thumbnails.medium.url;
    const subs = response.data.items[0].statistics.subscriberCount;
    const publishedDate = new Date(snippet.publishedAt).toLocaleDateString('en-GB', {  
                                                            day : 'numeric',
                                                            month : 'short',
                                                            year : 'numeric'
                                                        });
    const title = snippet.title;
    const description = snippet.description;
    const channelTitle = snippet.channelTitle;
    const viewCount = stats.viewCount;
    const likeCount = stats.likeCount;
    const dislikeCount = stats.dislikeCount;

    videoInfo = {
        title,
        description,
        publishedDate,
        channelTitle,
        channelImage,
        viewCount,
        likeCount,
        dislikeCount,
        subs
    };
}

export function loadHomePageData() {
  return async (dispatch, getState) => {
    const { nextPageToken } = getState().home;
    console.log(nextPageToken);
        dispatch({
            type: 'INIT_LOAD',
        })
        newVideoCards = [];  
        axios
        .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=16&regionCode=US&pageToken=${nextPageToken}&key=AIzaSyCMy24CVD8hdXHASiAVTZUjuVzBqHdD-3o`)
        .then(async (response) => {
          console.log(response.data.items)
          dispatch({
            type: 'UPDATE_NEXT_TOKEN',
            payload: response.data.nextPageToken,
          })
          await createVideoCards(response.data.items);
            dispatch({
                type: 'UPDATE_DATA',
                payload: newVideoCards || [],
            })  

        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: 'ERROR',
            })  
        })
  }
};

export function loadSearchPageData(searchQuery) {
  return async (dispatch) => {
    videoRows = [];
      axios
        .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=channel&q=${searchQuery}&safeSearch=none&key=AIzaSyCMy24CVD8hdXHASiAVTZUjuVzBqHdD-3o`)
        .then(async (response) => {
          await createChannelRow(response.data['items'][0]);
          console.log(channelRow);
          dispatch({
            type: 'UPDATE_SEARCH_CHANNEL',
            payload: channelRow,
          })
        })
        

        axios
        .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=9&type=video&q=${searchQuery}&safeSearch=none&key=AIzaSyCMy24CVD8hdXHASiAVTZUjuVzBqHdD-3o`)
        .then(async (response) => {
          await createVideoRows(response.data['items']);
          dispatch({
            type: 'UPDATE_SEARCH_VIDEO',
            payload: videoRows,
          })
        })
        .catch(error => {
          console.log(error);
            dispatch({
                type: 'SEARCH_ERROR',
            })
        })
  }
};

export function loadVideoData(videoId) {
  return async (dispatch) => {
    axios
        .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoId}&key=AIzaSyCMy24CVD8hdXHASiAVTZUjuVzBqHdD-3o`)
        .then(response => {
            console.log(response.data)
            createVideoInfo(response.data['items'][0]);
            dispatch({
                type: 'UPDATE_VIDEO_DATA',
                payload: videoInfo,
            })
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: 'VIDEO_ERROR',
            })
        })
  }
};

export function fetchComments(videoId) {
  return async (dispatch) => {
    axios
        .get(`https://www.googleapis.com/youtube/v3/commentThreads?part=id,snippet&videoId=${videoId}&key=AIzaSyCMy24CVD8hdXHASiAVTZUjuVzBqHdD-3o`)
        .then(response => {
            console.log(response.data)
            dispatch({
                type: 'UPDATE_COMMENTS_DATA',
                payload: response.data,
            })
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: 'COMMENTS_ERROR',
            })
        })
  }
};