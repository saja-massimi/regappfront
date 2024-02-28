import './App.css';
import { Link,Navigate} from "react-router-dom";
import { Component } from 'react';

export default class Register extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            Isregistered: false
        };
    }
  
  handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
      e.preventDefault();


      fetch("https://localhost:7144/api/Registration", {
          method: "POST",
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(this.state)
      }).then((res) => {
          console.log(res);
        this.setState({Isregistered : true});
    
      }).catch((err) => {
          console.log(err.message);
          this.setState({Isregistered :false});
      });

  }


  render() {
    if(this.state.Isregistered){
        return <Navigate to={ "/home"} pass={ this.setState.name }  />;
        
        }

      return (
          <>
           <div className="container" >
                  <h1> Register </h1>

                  <form onSubmit={this.handleSubmit}>


                      <div>
                          <label>Name</label>
                          <input type="text" className="form-control" value={this.state.name} onChange={this.handleChange} name="name" />
                      </div>

                      <div>
                          <label>Email</label>
                          <input type="email" className="form-control" value={this.state.email} onChange={this.handleChange} name="email" />

                          <div>
                              <label>Password</label>
                              <input type="password" className="form-control" value={this.state.password} onChange={this.handleChange} name="password" />
                          </div>

                          <div>
                              <br />
                              <input type="submit" value="Register" className="btn btn-primary" />
                          </div>

                       
                          <div>
                              <br />

                              <Link to="./Login">Already have an account?</Link>
                             
                          </div>
                      </div>
                  </form>

              </div>

          </>
      );

  }


}
