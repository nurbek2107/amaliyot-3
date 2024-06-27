import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/useSlice';
import todoReducer from '../features/TodoSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        todo: todoReducer,
    },
});

export default store; // Burada `store` export ediliyor
