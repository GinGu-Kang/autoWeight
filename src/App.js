
import './App.css';
import { Component } from 'react';
import TOC from './components/TOC';
import Subject from './components/Subject';
import {BrowserRouter} from 'react-router-dom';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:"welcome",
      subject:{title:"Web",sub:"wordld Wid Web"},
      welcom:{title:"Welecom",sub:"hel react"},
      contents:[
        {id:1, title:'HTML',desc:'World wid web'},
        {id:2, title:'CSS',desc:'css wid web'},

      ]
    } 
  }
  render(){
    
    return (
      <div className='App'>
          <h1> Hello.React!!</h1>
          <TOC data = {this.state.contents}></TOC>
          <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}></Subject>
      </div>
    );
  }
}


export default App;
