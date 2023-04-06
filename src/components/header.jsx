import React, { useState } from 'react';
import './header.css';
import { Link } from 'react-router-dom';

function Heading(){
    const [searchValue, setSearchValue] = useState('');
    return (
        <div className="nav flex-div">
            <div className="nav-left flex-div">
                <img src="/images/nav.png" className="menu-icon" alt="menu" />
                <Link to='/'>
                <img src="/images/logo1.png" className="logo" alt="logo" /></Link>
            </div>
            <div className="nav-middle flex-div">
                <div className="searchbox flex-div">
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Search"
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                window.location.href = `/search/${searchValue}`;
                            }

                        }
                        
                         }
                    />
                     <Link to={`/search/${searchValue}`}>
                    <img src="/images/search.png" alt="" />
                    </Link>
                </div>
                <img src="/images/mic2.png" className="mic-icon" alt="" />

            </div>
            <div className="nav-right flex-div">
                <img src="/images/upload.png" alt="" />
                <img src="/images/notification.png" alt="" />
                <img src="/images/olivia.jpeg" alt="" className="user-icon" />

            </div>
        
        </div>
    );
}

export default Heading;