import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import loaderReducer from "./loaderSlide";
import leaveReducer from "./leaveSlice"

const store = configureStore({
    reducer: {
        users: usersReducer,
        loaders: loaderReducer,
        leave: leaveReducer,
    }
})

export default store
