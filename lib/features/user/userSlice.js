const { createSlice } = require("@reduxjs/toolkit");

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: []
    },
    reducers: {
        addUser: (state, action) => {
            state.user.push(action.payload)
        }
    }
})

export const { addUser } = userSlice.actions
export default userSlice.reducer