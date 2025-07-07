const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  value: "idle",
}

const statusSlice = createSlice({
  name: "status",
  initialState: {
    currentState: false
  },
  reducers: {
    changeStatus: (state) => {
      state.currentState = !state.currentState
    },
  },
})

export const { changeStatus } = statusSlice.actions
export default statusSlice.reducer