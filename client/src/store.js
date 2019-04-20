import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

export const history = createBrowserHistory();

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(routerMiddleware(history), ...middleware)
  // other store enhancers if any
);
export default function configureStore(preloadedState) {
  return createStore(rootReducer(history), preloadedState, enhancer)
}
