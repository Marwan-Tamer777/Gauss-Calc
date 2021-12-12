import React from 'react';

class Gauss_Calculator extends React.Component {
    state={
        mSize: 0,
        Xs: [],
        equations: []
    } 

    getEquationList () {
        let content = [];
       
        for (let i = 0; i < this.state.mSize; i++) {
          content.push(<p key={i}>fas</p>);
        }
        
        return content;
      };
    
      render() {
      return <div className="flex flex-col flex-auto">
          <h1> السلام عليكم و رحمة الله و بركاته</h1>
          
          <div className="bg-slate-500 flex flex-row">
            <input id="mSize" type="number" defaultValue="0" min="0"></input>
            <button type="button" onClick={()=>(this.setState({mSize: document.querySelector('#mSize').value}))}>
                Click Me!</button>
          </div>
          
          <div>
              {
                  this.getEquationList()
              }
          </div>
          
          <div></div>
      </div>;
    }
  }

export default Gauss_Calculator;