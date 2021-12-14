import React from 'react';
import './output.css';

class Gauss_Calculator extends React.Component {
    state={
        mSize: 0,
        xs: [0,0,0,0],
        equations:[],
        mI:0,
        methodOption:0
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
                            <input id={"o"+index} type="number" defaultValue="0" className=" w-8"></input></span> ) 
                        : 
                        (<span>
                            <input id={"x"+index+i} type="number" defaultValue="0" className=" w-8"></input>
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
        this.setState({xs: xArray,equations: array})
    }

    PlaceHolder(){
        let pXs = []
        let eq = this.state.equations
        let X = 0;
        let cXs =[]
        for(let i=0;i<this.state.mSize;i++){
            pXs[i]=0
            cXs[i]=0
        }
        for(let z=0;z<this.state.mI;z++){
            for(let x=0;x<this.state.mSize;x++){
                X= eq[x][this.state.mSize]
                for(let y=0;y<this.state.mSize;y++){
                    if(!(x==y)){X=X- (this.state.methodOption ==1 ?(eq[x][y]*pXs[y]):(eq[x][y]*cXs[y]))}
                }
                X =(X/eq[x][x])
                cXs[x]=X
            }
         pXs = cXs
        }
        this.setState({xs: cXs})
        setTimeout(()=>(console.log(this.state)),100)
    }

    getSolution(){
        this.assignEquations()
        setTimeout(()=>(this.PlaceHolder()),100)
    }

    showSolution(){
        let solutionList = []
        for(let i=1;i<=this.state.mSize;i++){
            solutionList.push(<p key={i}>X{i}={this.state.xs[i-1]}</p>)
        }
        return solutionList
    }

      render() {
      return <div className="flex flex-col flex-auto">
          <h1 className="text-4xl m-auto bg-black text-white rounded-xl"> السلام عليكم و رحمةالله</h1>
          <div className="flex flex-row">
              <label>Num of Variables in the system:</label>
            <input id="mSize" type="number" defaultValue="0" min="0"></input>
            <label>Num of required Iterations:</label>
            <input id="mI" type="number" defaultValue="0" min="0"></input>
            <div className="flex flex-col">
            <label>0 = gauss and seidel method:</label>
            <label>1 = gauss and jaccobi method:</label>
            </div>
            <input id="methodOption" type="number" defaultValue="0" min="0" max="1"></input>
            <button type="button" onClick={()=>(this.setState({mSize: document.querySelector('#mSize').value, 
            mI:  document.querySelector('#mI').value,methodOption: document.querySelector('#methodOption').value}))}>
                Click Me!</button>
          </div>
          
          <div className="flex flex-col">
              {
                  this.getEquationList()
              }
          </div>

          <button type="button" onClick={()=>(this.getSolution())}>
                Click Me for solutions!</button>
                    {this.state.methodOption==0?(<h3>solution using gauss and seidel method</h3>):(<h3>solution using gauss and jaccobi method</h3>)}
          <div className="flex flex-col">
              {this.showSolution()}
          </div>
      </div>;
    }
  }

export default Gauss_Calculator;