import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

function Home({ toDos }) {
    const [text, setText] = useState('');
    function onSubmit(e) {
        e.preventDefault();
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

// connect를 이용해서 store.js에 state를 가져올 수 있음
export default connect(mapStateToProps)(Home);