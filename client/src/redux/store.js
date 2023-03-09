import { configureStore, combineReducers } from '@reduxjs/toolkit'
import CurrentUserReducer from './user/CurrentUserSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}
 
const rootReducer = combineReducers({
  user: CurrentUserReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),    
})


export const persistor = persistStore(store)
