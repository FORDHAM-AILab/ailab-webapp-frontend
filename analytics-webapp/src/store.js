import {configureStore } from '@reduxjs/toolkit'
import users from 'reducers/cache_user'
import {combineReducers} from 'redux'
import { persistStore, persistReducer,
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducer = combineReducers({
  users,
})

const persistConfig = {
  key: 'reducer',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});


export default store