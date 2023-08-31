import {store} from "./components/Redux/redux-store";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-redux";
import {StrictMode} from "react";

let rerenderAllTree = () => {
    ReactDOM.render(
        <StrictMode>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </StrictMode>,
        document.getElementById('root') as HTMLElement
    );
}

rerenderAllTree()

store.subscribe(rerenderAllTree)









