import { configureStore } from "@reduxjs/toolkit";
import statusReducer from './features/status/statusSlice'
import userReducer from './features/user/userSlice'
import currentReducer from './features/current/currentSlice'

export const store = () => {
    return configureStore({
        reducer: {
            status: statusReducer,
            user: userReducer,
            current: currentReducer
        }
    })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']