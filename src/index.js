import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import Thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './js/components/App';
import mazeReducer from './js/reducers/maze';
import UIReducer from './js/reducers/UI';
import './styles/styles.scss';

const rootReducer = combineReducers({
  maze: mazeReducer,
  UI: UIReducer
});

export const store = createStore(
  rootReducer,
  applyMiddleware(Thunk),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
