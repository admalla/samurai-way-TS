import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {addPost, State} from "./components/Redux/State";

ReactDOM.render(
    <App addPost={addPost} state={State} />,
  document.getElementById('root')
);







