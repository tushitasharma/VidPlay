import React from 'react';


function Spsidecomp(props){
    return <div class="special">
        <a href="/">
            <img src={props.icon} alt="" /><p>{props.name}</p>
        </a>
    </div>
}

export default Spsidecomp;