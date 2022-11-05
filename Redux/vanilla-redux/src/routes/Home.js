import React from 'react';
import { useState } from 'react';

function Home() {
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
            <ul></ul>
        </>
    );
}

export default Home;