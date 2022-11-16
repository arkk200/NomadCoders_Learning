import { configureStore, createSlice } from '@reduxjs/toolkit';

const toDos = createSlice({ // createSlice로 reducer, state, actions 다 만들 수 있다.
    name: 'toDosReducer',
    initialState: [],
    reducers: {
        add: (state, action) => {
            state.push({ text: action.payload, id: Date.now() });
        },
        remove: (state, action) => state.filter(toDo => toDo.id !== action.payload)
    }
});

export const { add, remove } = toDos.actions;

export default configureStore({ reducer: toDos.reducer });