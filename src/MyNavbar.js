import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function MyNavbar() {
    return (
        <>
<Navbar bg="dark" variant="dark" style={{paddingLeft:"10px" , position: "fixed" , width: '100%', overflow:'hidden'}}> 
        <Navbar.Brand href="/home">Home</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="/Departments">Departments</Nav.Link>
            <Nav.Link href="/Employees">Employees</Nav.Link>
        </Nav>  
        </Navbar>
        </>
    );
}

export default MyNavbar;