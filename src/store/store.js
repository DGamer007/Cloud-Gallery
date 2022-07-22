import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from './imagesSlice';

const store = configureStore({
    reducer: {
        images: imagesReducer
    }
});

export default store;