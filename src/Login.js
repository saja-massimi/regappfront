import './App.css';
import { Link } from "react-router-dom";
import { Component } from 'react';
export default class Login extends Component {


  constructor(props) {
      super(props);
      this.state = {
          email: '',
          password: ''
      };
  }

  handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
      e.preventDefault();


      fetch("https://localhost:7144/api/Registration/login", {
          method: "POST",
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(this.state)
      }).then((res) => {
          console.log(res);

      }).catch((err) => {
          console.log(err.message);
      });

  }


  render() {
      return (
          <>



              <div className="container" >
                  <h1> Login </h1>

                  <form onSubmit={this.handleSubmit}>


                
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

                              <Link to="./Registration">New User?</Link>
                              
                          </div>
                      </div>
                  </form>

              </div>

          </>
      );

  }


}
