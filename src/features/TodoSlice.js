import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
    completed: 0,
    unCompleted: 0,
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: () => {},
        removeTodo: () => {},
        changeTodoStatus: () => {},
        calculateTotal: () => {},
    },
});

export const { addTodo, removeTodo, changeTodoStatus, calculateTotal } = todoSlice.actions;
export default todoSlice.reducer;
