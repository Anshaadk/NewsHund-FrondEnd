import { configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer,FLUSH,REHYDRATE,PERSIST,PURGE,REGISTER, PAUSE} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import { filterNews } from "./slice/filterNews";

const filterNewsData = {key:"filterNewsData",storage,version:1}

const filterNewsReducer = persistReducer(filterNewsData,filterNews.reducer)

export const Store = configureStore({
    reducer: {
        FilterNews : filterNewsReducer,
    },
    middleware:(getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        }
    })
});


export const persistor = persistStore(Store);