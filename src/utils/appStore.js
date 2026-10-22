import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionsSlice";  
// Import the connections reducer
import requestReducer from "./requestSlice";  // Import the requests reducer
const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        requests: requestReducer,  // Add the requests reducer here
    },
});

export default appStore;