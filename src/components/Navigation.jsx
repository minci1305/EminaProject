import React from 'react'; 
import { Link } from 'react-router-dom'; 

const Header = () => { 
    return ( 
        <div className="App"> 
             <Link to="/" >  LogIn  </Link> 
             <Link to="/about" >  ToDoList </Link> 
             <a href="/about">dont' use this!</a>
        </div> 
    ); 
};