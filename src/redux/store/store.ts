import { compose, createStore } from "redux";
import reducer from '../reducers/reducer';

export default createStore(
  reducer,
  undefined,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
