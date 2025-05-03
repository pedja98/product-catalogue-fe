import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth.slice'
import notificationReducer from '../features/notifications.slice'

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
