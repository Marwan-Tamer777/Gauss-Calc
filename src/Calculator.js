import React from 'react';
import './output.css';

class Gauss_Calculator extends React.Component {
    state={
        mSize: 0,
        xs: [],
        Sxs:[],
        equations:[],
        mI:0,
        methodOption:0,
        eQs: 0
    } 

    assignStartValues(){
        let X=[]
        
        for(let i =0;i<document.querySelector('#mSize').value;i++){
            X.push(0)
        }

        this.setState({mSize: document.querySelector('#mSize').value,xs:X,Sxs:X, eQs: document.querySelector('#eqs'),
            mI:  document.querySelector('#mI').value,methodOption: document.querySelector('#methodOption').value})
    }

    getEquation (index) {
        let content = [];
        for (let i = 0; i <= this.state.mSize; i++) {
        content.push(
                <span key={i} className="self-center">
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
                <div key={i} className="self-center">
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

    mySolution(){
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

    samySolution(){
        //Gaus-seidel

    let n,i,j,k,flag=0,count=0;
    n= this.state.mSize

    let a = []; //declare a 2d array for storing the elements of the augmented matrix

    let x = []; //declare an array to store the values of variables

    let eps,y;
    let placeHolder = []
    for (i=0;i<n;i++){

        for (j=0;j<=n;j++){
            placeHolder[j]=this.state.equations[i][j];
        }
        a[i]= placeHolder
    }
    for (i=0;i<n;i++){
        x[i]= this.state.xs[i];
    }

    eps = this.state.eQs

    for (i=0;i<n;i++){ //Pivotisation(partial) to make the equations diagonally dominant

        for (k=i+1;k<n;k++){

            if (a[i][i]<a[k][i]){

                for (j=0;j<=n;j++)

                {

                    let temp=a[i][j];

                    a[i][j]=a[k][j];

                    a[k][j]=temp;

                }
            }
        }
    }

    //cout<<"Iter"<<setw(10);

    //for(i=0;i<n;i++)

      //  cout<<"x"<<i<<setw(18);

    //cout<<"\n----------------------------------------------------------------------";

    do //Perform iterations to calculate x1,x2,...xn

    {

        //cout<<"\n"<<count+1<<"."<<setw(16);

        for (i=0;i<n;i++) //Loop that calculates x1,x2,...xn

        {

            y=x[i];

            x[i]=a[i][n];

            for (j=0;j<n;j++)

            {

                if (j!=i)

                    x[i]=x[i]-a[i][j]*x[j];

            }

            x[i]=x[i]/a[i][i];

            if (Math.abs(x[i]-y)<=eps){ //Compare the ne value with the last value

                flag++;
            }
            //cout<<x[i]<<setw(18);

        }


        count++;

    }while(flag<3); //If the values of all the variables don't differ from their previous values with error more than eps then flag must be 3 and hence stop the loop

    this.setState({Sxs: x})
    }

    getSolution(){
        this.assignEquations()
        setTimeout(()=>(this.mySolution()),100)
        setTimeout(()=>(this.samySolution()),100)
    }

    showSolution(){
        let solutionList = []
        for(let i=0;i<this.state.mSize;i++){
            solutionList.push(<p key={i} className="self-center">X{i+1}={this.state.xs[i].toFixed(4)}</p>)
        }
        return solutionList
    }

    showSamySolution(){
        let solutionList = []
        for(let i=0;i<this.state.mSize;i++){
            solutionList.push(<p key={i} className="self-center">X{i+1}={this.state.Sxs[i].toFixed(4)}</p>)
        }
        return solutionList
    }
         
     showNames(){
            let namesList =[]
            for(let i=0;i<=this.names.length-1;i+=2){
                namesList.push(<span className="w-1/3 p-2 text-lg">
                            {"Name: " +this.names[i] + "   ID: " + this.names[i+1]}
                 </span>)
            }
            return namesList
        }

        names = [["Marwan Tamer Galal"] ,["20200508"],["Abdelrhman Mohmed Ahmed Mahros"] ,["20200318"],
          ["Khaled Fahmy Mohamed"], ["20200169"],["samy Mohsen Mousa"] ,["20200220"],
          ["Abdelaziz Ashraf Abdelaziz"] ,["20200321"],["Mohamed Mahmoud Mohamed"], ["20200474"],
          ["Ahamed Adel Ali"], ["20201009"],["Mohamed Yasser shehta"],["20200484"]]
        render() {
      return <div className="flex flex-col flex-auto">
          <h1 className="text-4xl m-auto bg-black text-white rounded-xl p-5 mt-5 mb-5">  السلام عليكم و رحمةالله و بركاته</h1>
          <h1 className="text-4xl m-auto bg-black text-white rounded-xl p-5 mt-5 mb-5"> approximation calculator for linear systems by:</h1>
          <div className="flex flex-row flex-wrap bg-slate-600 m-2 rounded-xl">
              {this.showNames()}
          </div>
          <div className="flex flex-row content-center justify-center">
            <label className="self-center m-3">Num of Variables in the system:</label>
            <input id="mSize" type="number" defaultValue="0" min="0"></input>
            <label className="self-center m-3">Num of required Iterations(usef for first solution only):</label>
            <input id="mI" type="number" defaultValue="0" min="0"></input>
            <div className="flex flex-col">
            <label className="self-center m-3">0 = gauss and seidel method:</label>
            <label className="self-center m-3">1 = gauss and jaccobi method:</label>
            </div>
            <input id="methodOption" type="number" defaultValue="0" min="0" max="1"></input>
            <label className="self-center m-3">enter the accuracy upto (used for second solution only): </label>
            <input id="eqs" type="number" defaultValue="0" min="0"></input>
            <button type="button" onClick={()=>(this.assignStartValues())}>
                Click Me!</button>
          </div>
          
          <div className="flex flex-col justify-center content-center">
              {
                  this.getEquationList()
              }
          </div>

          <button type="button" className="self-center" onClick={()=>(this.getSolution())}>
                Click Me for solutions!</button>
                    {this.state.methodOption==0?(<h2 className="self-center text-xl bg-black rounded-xl p-3 text-white">solution using gauss and seidel method</h2>):
                    (<h2 className="self-center text-xl bg-black rounded-xl p-3 text-white">solution List 1 using gauss and jaccobi method</h2>)}
          <div className="flex flex-col">
              {this.showSolution()}
          </div>
          <h2 className="self-center text-xl bg-black rounded-xl p-3 text-white">solution List 2 using gauss and jaccobi method</h2>
          <div className="flex flex-col">
              {this.showSamySolution()}
          </div>
      </div>;
    }
  }

export default Gauss_Calculator;