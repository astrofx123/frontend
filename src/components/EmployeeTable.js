import { React, useEffect, useState } from "react";
import Nav from "./Nav";
import "../style/employeeTableStyle.css";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/DeleteIcon";
// import DeleteIcon from "@mui/icons-material/DeleteIcon";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
// import { DeleteIcon } from "@mui/icons-material/DeleteIcon";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useSpring , animated} from 'react-spring';

const EmployeeTable = () => {
  const [employees, setemployees] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [employeeType, setemployeeType] = useState("");
  const headerprops = useSpring({form : {opacity : 0 } , to:{opacity:1} , delay : 1000})
  const props = useSpring({form : {opacity : 0 } , to:{opacity:1} , delay : 1500});
  const [isgetUpcomingRetierment, setisgetUpcomingRetierment] = useState(false);
  const deleteEmployee = (id, currentStatus) => {
    let c = window.confirm("Are you sure you want to delete? " + id);
    // let c = confirm("Are you sure you want to delete " + id);
    if (c) {
      if (currentStatus === "1") {
        alert("Can not delete working employee");
        return;
      }

      const deleteQuery = {
        query: `
          mutation{
            deleteEmployeeById(employeeId : "${id}")
          }
          `,
      };

      fetch("http://server-1234563.herokuapp.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteQuery),
      });

      window.location.reload();
    } else {
      return;
    }
  };

  useEffect(() => {
    const requestBody1 = {
      query: ` query {
        getEmployeesByType(employeeType  :"${employeeType}" ){
          _id,
          firstName,
          lastName,
          age,
          title,
          dateOfJoining,
          department,
          employeeType,
          currentStatus ,
        }
      }`,
    };

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody1),
    })
      .then((response) => {
        console.log(response);

        return response.json();
      })
      .then((data) => {
        console.log(data);
        setemployees(data.data.getEmployeesByType);
        // console.log(data.getEmployees);

        console.log(employees);
      });
  }, [employeeType , isgetUpcomingRetierment]);

  const checkRetierment = (joinDate, age) => {
    console.log("runniung");
    let joiningDate = new Date(joinDate);
    let retirementDate = new Date(joinDate);
    let currentDate = new Date();
    retirementDate.setFullYear(joiningDate.getFullYear() + (65 - age));

    console.log(
      `Join date : ${joiningDate.getDate()} / ${joiningDate.getMonth()} / ${joiningDate.getFullYear()} `
    );

    console.log(
      `retirementDate  : ${retirementDate.getDate()} / ${retirementDate.getMonth()} / ${retirementDate.getFullYear()} `
    );

    if(retirementDate.getFullYear() < currentDate.getFullYear() ){
      return <Alert severity="success">Retiered</Alert>;
    }

    if (retirementDate.getFullYear() - currentDate.getFullYear() > 0) {
      return (
        <Alert icon={false} severity="success">
          {retirementDate.getDate()}-{retirementDate.getMonth()}-
          {retirementDate.getFullYear()}
        </Alert>
      );
    } else {
      let remainingMonths = retirementDate.getMonth() - currentDate.getMonth();
      console.log(remainingMonths);
      if (remainingMonths < 6) {
        if (remainingMonths < 0) {
          console.log("retired");
          return <Alert severity="success">Retiered</Alert>;
        }else{
          console.log("Retirring soon")
          return "Retiering Soon";
        }
    
      } else {
        console.log("Retirring soon")
        return `${retirementDate.getDate()} / ${retirementDate.getMonth()} / ${retirementDate.getFullYear()} `;
      }
    }

  };

  const getOnlyUpcomingRetierment = () =>{
    console.log(isgetUpcomingRetierment);
    setisgetUpcomingRetierment(true)
    console.log(isgetUpcomingRetierment);
  }

  return (
    <>
      <Nav></Nav>

      <animated.div style={props}>
      <div className="employee-table-container">
        {/* <header>Employee Table</header> */}



        <div className="filter-option">
          <div className="form-control">
            <label htmlFor="employeeType">EmployeeType</label>
            <select
              value={employeeType}
              onChange={(e) => setemployeeType(e.target.value)}
            >
              <option value=" ">All Employees</option>
              <option value="fullTime">Full Time</option>
              <option value="partTime">Part Time</option>
              <option value="contract">Contract</option>
              <option value="seasonal">Seasonal</option>
            </select>
          </div>


        <Button  onClick={getOnlyUpcomingRetierment} >  Get Upcoming Retirement </Button>

        </div>

        {employees.length === 0 ? (
          <span> No Employee To Show </span>
        ) : (
          <div className="employee-table">
            <table>

            

              <thead>
                <tr>
                  <th>First Name</th>
                  <th>LastName</th>
                  <th>Age</th>
                  <th>Title</th>
                  <th>Date Of Joining</th>
                  <th>Department</th>
                  <th>Employee Type</th>
                  <th>Retierment Status</th>
                  <th>currentStatus</th>
                </tr>
              </thead>

              <tbody>



                {employees.map((e) => {
                  console.log(e);
                  return (
                    
                    <tr>{
                        isgetUpcomingRetierment ? 
                         checkRetierment(e.dateOfJoining, e.age)==="Retiering Soon" ? 
                         <>
                         <td> {e.firstName} </td>
                         <td> {e.lastName} </td>
                        <td> {e.age} </td>
                        <td> {e.title} </td>
                        <td> {e.dateOfJoining} </td>
  
                        <td> {e.department} </td>
                        <td> {e.employeeType} </td>
                        <td> {checkRetierment(e.dateOfJoining, e.age)} </td>
                        <td>
                          {" "}
                          {e.currentStatus === "1"
                            ? "Working"
                            : "Not Working"}{" "}
                        </td>
                        <td>
                          {" "}
                          <IconButton to={`/employee/${e._id}`} component={Link}>
                            <EditIcon>
                              {/* <Link to={`/employee/${e._id}`}> Get Details </Link>{" "} */}
                            </EditIcon>
                          </IconButton>
                        </td>
                        <td>
                          {/* <Button variant="outlined" startIcon={<DeleteIcon />}>
                            Delete
                          </Button> */}
  
                          <IconButton
                            color="error"
                            onClick={() => deleteEmployee(e._id, e.currentStatus)}
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </td></>:""  :  <> <td> {e.firstName} </td>
                        <td> {e.lastName} </td>
                        <td> {e.age} </td>
                        <td> {e.title} </td>
                        <td> {e.dateOfJoining} </td>
  
                        <td> {e.department} </td>
                        <td> {e.employeeType} </td>
                        <td> {checkRetierment(e.dateOfJoining, e.age)} </td>
                        <td>
                          {" "}
                          {e.currentStatus === "1"
                            ? "Working"
                            : "Not Working"}{" "}
                        </td>
                        <td>
                          {" "}
                          <IconButton to={`/employee/${e._id}`} component={Link}>
                            <EditIcon>
                              {/* <Link to={`/employee/${e._id}`}> Get Details </Link>{" "} */}
                            </EditIcon>
                          </IconButton>
                        </td>
                        <td>
                          {/* <Button variant="outlined" startIcon={<DeleteIcon />}>
                            Delete
                          </Button> */}
  
                          <IconButton
                            color="error"
                            onClick={() => deleteEmployee(e._id, e.currentStatus)}
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </td></>
                      }
                     
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
          </animated.div>
    
    </>
  );
};

export default EmployeeTable;
