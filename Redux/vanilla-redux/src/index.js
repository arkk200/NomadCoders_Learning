import React from "react";
import App from './components/App';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';

createRoot(document.getElementById('root')).render(
    <Provider store={store}> {/* Provider를 이용해서 아래에 store.js에 store를 쓸 수 있게 함 */}
        <App />
    </Provider>
);