import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function MyNavbar() {
    return (
        <>

<Navbar bg="dark" variant="dark" style={{padding:"5px"}}> 
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