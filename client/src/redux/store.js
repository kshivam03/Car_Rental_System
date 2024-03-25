import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { carsReducer } from './reducers/carsReducer';
import { alertsReducer } from './reducers/alertsReducer';
import { bookingsReducer } from './reducers/bookingsReducer';
import { usersReducer } from './reducers/usersReducer';

const composeEnhancers = composeWithDevTools({
  
});

const rootReducer = combineReducers({
    carsReducer,
    alertsReducer,
    bookingsReducer,
    usersReducer,
})

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
    
  )
);

export default store