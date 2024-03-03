import './App.css';
import { Component } from 'react';

export default class Home extends Component {
 

    constructor(props) {
        super(props);

        this.state = {
            username: ''
        };
    }
    componentDidMount()
    {
     this.getUsername();
    }

    getUsername = () => {

       let JWTtoken = sessionStorage.getItem('token');

        fetch("https://localhost:7144/api/Registration", {
            method: "GET",
            headers: { 'content-type': 'application/json', Authorization: 'bearer 4'+ JWTtoken},
        }).then((res) => {
          
          if(res.status===200)
          {
        console.log(res);
         return res.json();
          
          }
    
        }).then((data) => {

            console.log(data);
            this.setState({ username: data.username }); 

          })
          .catch((err) => {
            console.log(err.message);
          });
  
    }



        
    
  render() {

      return (
          <>

              <div className="container" >
                  <h1> Welcome  {this.state.username}</h1>
              </div>

          </>
      );
  }

}
