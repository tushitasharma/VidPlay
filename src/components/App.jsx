import React from 'react';
import Heading from './header';
import Sidebar from './sidebar';
import RecommendedVideos from './recommended';
import SearchPage from './SearchPage';
import VideoPlayer from './VideoPlayer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider } from "react-redux";
import store from '../store/store';


function App(){
    return (
    <div>
    <Provider store={store} >
        <Router>
            <Heading />
            <Routes>
                <Route path='/video/:videoId' element={
                    <VideoPlayer />
                } />
                <Route path='/search/:searchQuery' element={
                    <div className='home-section'>
                        <Sidebar />
                        <SearchPage />
                    </div>
                } />
                <Route path='/' element={
                    <div className='home-section'>
                        <Sidebar />
                        <div className='home-page-videos'>
                            <RecommendedVideos />
                        </div>
                    </div>
                } />
            </Routes>
        </Router>
    </Provider>
    </div>
    );
}

export default App;