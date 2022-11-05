import React, { useState } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

function Home({ toDos, addToDo }) {
    const [text, setText] = useState('');
    function onSubmit(e) {
        e.preventDefault();
        addToDo(text);
        setText("");
    }
    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={e => setText(e.target.value)} />
                <button>Add</button>
            </form>
            <ul>
                {JSON.stringify(toDos)}
            </ul>
        </>
    );
}

function mapStateToProps(state) {
    return { toDos: state }
}

function mapDispatchToProps(dispatch) {
    return {
        addToDo: text => dispatch(actionCreators.addToDo(text))
    }
}

// connect를 이용해서 store.js에 state를 가져올 수 있음
// 또한 dispatch도 가져올 수 있음
// connect가 반환하는 함수의 인자인 Home의 props로 
// mapStateToProps, mapDispatchToProps의 반환값이 전달됨
export default connect(mapStateToProps, mapDispatchToProps)(Home);