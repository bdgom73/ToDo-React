import React from "react";
import {TodoProvider} from '../store/ContextDispatch';
import Home from './Home';
import "../assets/css/style.css"
const App = () => {

    return (
       <TodoProvider>
           <Home/>
       </TodoProvider>
    );
};

export default App;
