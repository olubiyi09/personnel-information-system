import { createSlice } from "@reduxjs/toolkit";

interface UsersState {
    currentUser: any;
    userRoles: Record<string, string>;
}

const initialState: UsersState = {
    currentUser: null,
    userRoles: {},
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setUserRoles: (state, action) => {
            state.userRoles = action.payload;
        },
        updateUserRole: (state, action) => {
            const { userId, newRole } = action.payload;
            state.userRoles[userId] = newRole;
        },
    },
});

export const { setCurrentUser, setUserRoles, updateUserRole } = usersSlice.actions;

export default usersSlice.reducer;
