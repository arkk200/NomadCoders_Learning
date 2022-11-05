import React from "react";
import App from './components/App';
import { createRoot } from 'react-dom/client';
import { Proveder } from 'react-redux';
import store from './store';

createRoot(document.getElementById('root')).render(
    <Proveder store={store}>
        <App />
    </Proveder>
);