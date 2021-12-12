import React from 'react';
import './output.css';

class Gauss_Calculator extends React.Component {
    state={
        mSize: 0,
        Xs: [],
        equations: []
    } 

    getEquation (index) {
        let content = [];
        for (let i = 0; i <= this.state.mSize; i++) {
          content.push(
                <span key={i}>
                    {
                        i == this.state.mSize ?  
                        (<span>
                            <span className="text-2xl"> = </span> 
                            <input id={"o"+index} type="number" defaultValue="0" min="0" className=" w-8"></input></span> ) 
                        : 
                        (<span>
                            <input id={"x"+index+i} type="number" defaultValue="0" min="0" className=" w-8"></input>
                            <span className="m-2 text-green-600">X{i+1}</span>
                            </span>)
                    }
                </span>
            );
        }
        return content;
      };

    getEquationList () {
        let content = [];
       
        for (let i = 0; i < this.state.mSize; i++) {
          content.push(
                <div key={i}>
                    {
                        this.getEquation(i)
                    }
                </div>
            );
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
          
          <div className="flex flex-col">
              {
                  this.getEquationList()
              }
          </div>
          
          <div></div>
      </div>;
    }
  }

export default Gauss_Calculator;