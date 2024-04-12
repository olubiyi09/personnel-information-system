// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     leaveData: [],
// };

// const leaveSlice = createSlice({
//     name: "leave",
//     initialState,
//     reducers: {
//         setLeaveData: (state, action) => {
//             state.leaveData = action.payload;
//         },
//     },
// });

// export const { setLeaveData } = leaveSlice.actions;

// export default leaveSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Leave {
    // Define the structure of your Leave object
    _id: string;
    fullname: string;
    date: string;
    leaveType: string;
    applicationStatus: string;
    userID: string;
}

interface LeaveState {
    leaveData: Leave[];
}

const initialState: LeaveState = {
    leaveData: [],
};

const leaveSlice = createSlice({
    name: "leave",
    initialState,
    reducers: {
        setLeaveData: (state, action: PayloadAction<Leave[]>) => {
            state.leaveData = action.payload;
        },
        addLeave: (state, action: PayloadAction<Leave>) => {
            state.leaveData.push(action.payload);
        },
    },
});

export const { setLeaveData, addLeave } = leaveSlice.actions;

export default leaveSlice.reducer;
