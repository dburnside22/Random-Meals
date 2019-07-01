import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from "redux";
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Meal from './components/Meal/Meal';

const initialState = {
    meals: []
}

function reducer(state = initialState, action) {
    switch (action.type){
        case "CHANGERANDOMMEALS":
            console.log('meals', action.payload.meals);
            return {
                meals: action.payload.meals
            };
        default: 
            return state;
        }
}

const store = createStore(reducer);

const routing = (
    <Router>
        <Provider store={store}>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/:id" component={Meal} />
            </div>
      </Provider>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
