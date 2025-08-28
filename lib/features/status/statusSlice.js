// const { createSlice } = require("@reduxjs/toolkit");
import { createSlice } from '@reduxjs/toolkit'

const statusSlice = createSlice({
  name: "status",
  initialState: {
    currentState: false,
    linkStatus: false,
    notesStatus: false
  },
  reducers: {
    changeStatus: (state) => {
      state.currentState = !state.currentState
    },
    changeLinkStatus: (state) => {
      state.linkStatus = !state.linkStatus
    },
    changeNotesStatus: (state) => {
      state.notesStatus = !state.notesStatus
    }
  },
})

export const { changeStatus, changeLinkStatus, changeNotesStatus } = statusSlice.actions
export default statusSlice.reducer