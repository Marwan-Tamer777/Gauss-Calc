import React from 'react';

class Gauss_Calculator extends React.Component {
    state={
        mSize: 0,
        Xs: [],
        equations: []
    } 
    render() {
      return <div className="flex flex-col flex-auto">
          <h1> السلام عليكم و رحمة الله و بركاته</h1>
          
          <div className="bg-slate-500 flex flex-row">
            <input id="mSize" type="number" defaultValue="0" min="0"></input>
            <button type="button" onClick={()=>(this.setState({mSize: document.querySelector('#mSize').value}))}>
                Click Me!</button>
          </div>
          
          <div></div>
          
          <div></div>
      </div>;
    }
  }

export default Gauss_Calculator;