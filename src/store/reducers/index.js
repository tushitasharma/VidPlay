import home from "./home";
import search from "./search";
import video from "./video";
import comments from "./comments";

import { combineReducers } from "redux";

const reducers = combineReducers(
    {
        home,
        search,
        video,
        comments,
    }
);

export default reducers;
