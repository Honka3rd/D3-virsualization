import React from 'react';
import ReactDOM from 'react-dom';
import Loop from './LoopWithInterval';

const App =()=>{
    return <div><Loop/></div>
}

ReactDOM.render(<App/>, document.querySelector("#root"));