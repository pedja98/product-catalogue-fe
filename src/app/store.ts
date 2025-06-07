import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth.slice'
import ConfirmReducer from '../features/confirm.slice'
import notificationReducer from '../features/notifications.slice'
import { pcApi } from './apis/core/pc.api'

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationReducer,
  confirm: ConfirmReducer,
  [pcApi.reducerPath]: pcApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'payload.onConfirm'],
        ignoredActionPaths: ['payload.onConfirm', 'payload.onCancel', 'meta.baseQueryMeta'],
        ignoredPaths: ['confirm.onConfirm', 'confirm.onCancel', 'api.meta.baseQueryMeta'],
      },
    }).concat(pcApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
