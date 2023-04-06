import React from 'react';
import './header.css';
import Sidecomp from './sidecomp';
import Subscriptions from './subscriptions';
import Spsidecomp from './spsidecomp';

function Sidebar(){
    return (
        <div class="sidebar">
            <div class="shortcut">
                <Spsidecomp icon="/images/home.png" name="Home" />
                <Sidecomp icon="/images/shorts.png" name="Shorts" />
                <Sidecomp icon="/images/subscriprion.png" name="Subscriptions" />
                <hr />
                <Sidecomp icon="/images/library.png" name="Library" />
                <Sidecomp icon="/images/history.png" name="History" />
                <Sidecomp icon="/images/vid.png" name="Your videos" />
                <Sidecomp icon="/images/later.png" name="Watch later" />
                <Sidecomp icon="/images/like.png" name="Liked videos" />
                <hr />
            </div>
            <div class="sub-list">
                <h3>Subscriptions</h3>
                <Subscriptions icon="/images/taylor.jpeg" name="Taylor Swift" />
                <Subscriptions icon="/images/conan.jpeg" name="Conan Gray" />
                <Subscriptions icon="/images/lilly.jpeg" name="Lilly Singh" />
                <Subscriptions icon="/images/selena.jpeg" name="Selena Gomez" />
                <Subscriptions icon="/images/olivia.jpeg" name="Olivia Rodrigo" />
            </div>
        </div>
    );
}

export default Sidebar;