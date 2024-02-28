import './App.css';
import { Component } from 'react';
export default class Home extends Component {
    
constructor(props) {
      super(props);
      this.state = {
          
          pass: props.location.state.name ? props.location.state.name : 'null' 
      };
  }
 
  
  render() {
      return (
          <>

              <div className="container" >
                  <h1> Welcome {this.state.name} </h1>
              </div>

          </>
      );
  }

}
