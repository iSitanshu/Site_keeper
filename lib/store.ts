import { configureStore } from "@reduxjs/toolkit";
import statusReducer from './features/status/statusSlice'
import userReducer from './features/user/userSlice'

export const store = () => {
    return configureStore({
        reducer: {
            status: statusReducer,
            user: userReducer
        }
    })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']