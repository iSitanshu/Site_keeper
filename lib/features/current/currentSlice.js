const { createSlice } = require('@reduxjs/toolkit')

const currentSlice = createSlice({
    name: "current",
    initialState: {
        currentPlaylist: '',
        currentLink: '',
        currentNote: ''
    },
    reducers: {
        changeCurrentPlaylist: (state, action) => {
            state.currentPlaylist = action.payload
        },
        changeCurrentLink: (state, action) => {
            state.currentLink = action.payload
        },
        changeCurrentNote: (state, action) => {
            state.currentNote = action.payload
        },
    }
})

export const { changeCurrentPlaylist, changeCurrentLink, changeCurrentNote } = currentSlice.actions
export default currentSlice.reducer