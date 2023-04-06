import React from 'react';


function Subscriptions(props){
    return <div>
        <a href="/">
            <img src={props.icon} alt="" /><p>{props.name}</p>
        </a>
    </div>
}

export default Subscriptions;