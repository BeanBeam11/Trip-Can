import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

import accountReducer from './accountSlice';
import spotReducer from './spotSlice';
import tripReducer from './tripSlice';
import userReducer from './userSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

export const store = configureStore({
    reducer: {
        account: accountReducer,
        spot: spotReducer,
        trip: tripReducer,
        user: userReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});

persistStore(store);
