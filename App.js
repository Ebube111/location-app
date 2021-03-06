import React from 'react';
import { combineReducers, applyMiddleware, createStore} from 'redux'
import { Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'

import PlacesNavigator from './navigation/PlacesNavigation'
import placesReducer from './store/places-reducer'
import {init} from './helpers/db'

init().then(() => {
  console.log('initialized database');
  
}).catch(err => {
  console.log('initializing db failed');
  console.log(err);
  
})

const rootReducer = combineReducers({
  places: placesReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
    <PlacesNavigator />
    </Provider>
  )
  
}
