import React from 'react';
import './output.css';

class Gauss_Calculator extends React.Component {
    state={
        mSize: 0,
        xs: [],
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
    
    assignEquations(){
        let array=[]
        let cArray=[]
        let xArray=[]
        for(let x=0;x<this.state.mSize;x++){
            for(let y=0;y<=this.state.mSize;y++){
                y == this.state.mSize ? 
                cArray.push(document.querySelector('#o'+x).value):
                cArray.push(document.querySelector('#x'+x+y).value)
            }
            array.push(cArray)
            cArray=[]
            xArray.push(0)
        }
        this.setState({xs: xArray})
        this.setState({equations: array})
    }

    getSolution(){
        this.assignEquations()
        let pXs = this.state.xs;
        let cXs =[];
        
        for(let x=0;x<this.state.mSize;x++){
            cXs.push()
        }

     //   this.setState({xs: cXs})
        setTimeout(()=>(console.log(this.state)),100)
    }

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

          <button type="button" onClick={()=>(this.getSolution())}>
                Click Me for solutions!</button>

          <div>

          </div>
      </div>;
    }
  }

export default Gauss_Calculator;