// import { createStore } from "redux";
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

const reducer = createReducer([], {
    [addToDo]: (state, action) => {
        // createReducer를 쓰면 state를 mutate할 수 있음
        state.push({ text: action.payload, id: Date.now() });
    },
    [deleteToDo]: (state, action) => 
        state.filter(toDo => toDo.id !== action.payload)
})

// configureStore는 chome Redux DevTools 확장 프로그램을 통해 브라우저에 개발 툴을 쓸 수 있게 해줌
const store = configureStore({ reducer });

export const actionCreators = {
    addToDo,
    deleteToDo
}

export default store;