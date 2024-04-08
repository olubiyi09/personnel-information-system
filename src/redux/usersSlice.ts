import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        }
    }
});

export const { setCurrentUser } = usersSlice.actions

export default usersSlice.reducer