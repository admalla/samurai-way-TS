import {store} from "./components/Redux/State";
import ReactDOM from "react-dom";
import App from "./App";

let rerenderAllTree = () => {
    ReactDOM.render(
        <App store={store} dispatch={store.dispatch.bind(store)} />,
        document.getElementById('root')
    );
}

rerenderAllTree()

store.subscribe(rerenderAllTree)









