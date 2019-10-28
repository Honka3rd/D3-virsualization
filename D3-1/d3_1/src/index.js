import React from 'react';
import ReactDOM from 'react-dom';
import DataLoader from './loadData';

const App =()=>{
    return <div><DataLoader/></div>
}

ReactDOM.render(<App/>, document.querySelector("#root"));