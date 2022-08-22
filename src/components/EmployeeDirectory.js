import React from "react";
import "../style/employeeDirectoryStyle.css";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeTable from "./EmployeeTable";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import {useSpring , animated} from 'react-spring';

const EmployeeDirectory = () => {

  const props = useSpring({from : {opacity : 0 } ,to : {opacity : 1} , delay :1000});

  return (
    <>
      <Nav></Nav>

      <animated.div style={props}>
      <div  className="employeeDirectory-container">
        <header>
          Welcome To{" "}
          <span className="site-title"> Employee Management System</span>
        </header>
      </div>

      </animated.div>

     
    </>
  );
};

export default EmployeeDirectory;
