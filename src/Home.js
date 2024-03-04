import './App.css';
import { Component } from 'react';
import { Navigate} from "react-router-dom";

export default class Home extends Component {
 

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            isAuthorized: true
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
            headers: { 'content-type': 'application/json', Authorization: 'bearer '+ JWTtoken},
        }).then((res) => {
          
          if(res.status===200)
          {
            this.setState({isAuthorized: true});
        console.log(res);
         return res.json();
          
          }else           
          this.setState({isAuthorized: false});

    
        }).then((data) => {

            console.log(data);
            this.setState({ username: data.username }); 

          })
          .catch((err) => {
            console.log(err.message);
          });
  
    }



        
    
  render() {
    if(!this.state.isAuthorized)
    return <Navigate to={{ pathname: '/unauthorized' }} />; 
      return (
          <>

              <div className="container" >
                  <h1> Welcome  {this.state.username}</h1>
              </div>

          </>
      );
  }

}
