import { React, useState, history } from "react";
import Nav from "./Nav";
import "../style/employeeCreate.css";
import TextField from "@mui/material/TextField";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Select from "@mui/material/Select"; 
import { useSpring , animated } from "react-spring";
// • FirstName, LastName, Age, DateOfJoining, Title, Department, EmployeeType
const EmployeeCreate = () => {
  const [name, setname] = useState("");

  const props = useSpring({ from : {opacity: 0 } , to: {opacity :1}  , delay:1000 })
  const [employee, setemployee] = useState({
    firstName: "",
    lastName: "",
    age: "",
    dateOfJoining: "",
    title: "SOmrhing",
    department: "",
    employeeType: "",
  });

  const [errorMessage, seterrorMessage] = useState("");

  //----------- STYLING

  //----------- END OF STYLING

  const createEmployee = (e) => {
    e.preventDefault();
    console.log(employee);
    console.log("Creating New Employee");

    if (employee.firstName === "") {
      seterrorMessage("Please Enter First Name.");
      return;
    }

    if (employee.lastName === "") {
      seterrorMessage("Please Enter Last Name.");
      return;
    }

    if (employee.age === "") {
      seterrorMessage("Please Enter age.");
      return;
    } else {
      if (employee.age < 20 || employee.age > 70) {
        seterrorMessage("Age Should Be Between 20-70.");
      }
    }

    if (employee.title === "") {
      seterrorMessage("Please Enter title");
      return;
    }

    if (employee.department === "") {
      seterrorMessage("Please Enter Department");
      return;
    }

    if (employee.employeeType === "") {
      seterrorMessage("Please Enter Employee Type");
      return;
    }

    const requestBody = {
      query: `
        mutation {
          createEmployee(employeeInput : {firstName : "${employee.firstName}" ,
                                      lastName   : "${employee.lastName}", 
                                      age : "${employee.age}",
                                      dateOfJoining : "${employee.dateOfJoining}" ,
                                      title : "${employee.title}" , 
                                      department : "${employee.department}" ,
                                      employeeType : "${employee.employeeType}" 
                   }
                       )
                                      {
                                        firstName,
                                        lastName
                                      }
                    }                         
      `,
    };

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setemployee({
      firstName: "",
      lastName: "",
      age: "",
      dateOfJoining: "",
      title: "",
      department: "",
      employeeType: "",
    });

    // history.push("/showemployee");
  };

  return (
    <>
      <Nav></Nav>


 <animated.div style={props}>
 <div className="employeeCreate-container">
        <form className="employee-create-form">
          <header className="add-emp-header">Add New Employee</header>
          {errorMessage != "" ? (
            <span className="error-message"> {errorMessage} </span>
          ) : (
            ""
          )}

          <div className="form-control">
            {/* <label htmlFor="firstName">FirstName</label> */}
            <TextField
              style={{ mr: "1rem" }}
              id="standard-basic"
              label="First Name"
              value={employee.firstName}
              onChange={(e) =>
                setemployee({ ...employee, firstName: e.target.value })
              }
              variant="standard"
            />
          </div>

          <div className="form-control">
            <TextField
              id="standard-basic"
              label="Last Name"
              value={employee.lastName}
              onChange={(e) =>
                setemployee({ ...employee, lastName: e.target.value })
              }
              variant="standard"
            />
          </div>

          <TextField
            style={{ mr: "1rem" }}
            id="standard-basic"
            label="Age"
            value={employee.age}
            onChange={(e) => setemployee({ ...employee, age: e.target.value })}
            variant="standard"
          />
{/* 
<DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/dd/yyyy"
          value={employee.dateOfJoining}
          onChange={(e) =>
            setemployee({
              ...employee,
              dateOfJoining: e.target.value,
            })
          }
          renderInput={(params) => <TextField {...params} />}
        /> */}

          <div className="form-control">
            <label htmlFor="dateOfJoining">Date Of Joining</label>
            <input
              type="date"
              value={employee.dateOfJoining}
              onChange={(e) =>
                setemployee({
                  ...employee,
                  dateOfJoining: e.target.value,
                })
              }
            ></input>
          </div>

          <div
            className="form-control"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "2rem",
            }}
          >
            <div className="form-control">
              <InputLabel id="demo-simple-select-label">Title</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={employee.title}
                label="Age"
                onChange={(e) =>
                  setemployee({ ...employee, title: e.target.value })
                }
              >
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="director">Director</MenuItem>
                <MenuItem value="vp">VP</MenuItem>
              </Select>
              {/* <label htmlFor="title">Title</label>
            <select
              value={employee.title}
              onChange={(e) =>
                setemployee({ ...employee, title: e.target.value })
              }
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="director"></option>
              <option value="vp">VP</option>
            </select> */}
            </div>


            <div className="form-control">
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select

                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={employee.department}
                onChange={(e) =>
                  setemployee({ ...employee, department: e.target.value })
                }
              >
                <MenuItem value="it">IT</MenuItem>
                <MenuItem value="marketing">Marketing</MenuItem>
                <MenuItem value="hr">HR</MenuItem>
                <MenuItem value="engineering">Engineering</MenuItem>
              </Select>
            </div>

            <div className="form-control">
              <InputLabel id="demo-simple-select-label">
                Employee Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={employee.employeeType}
                label="Age"
                onChange={(e) =>
                  setemployee({ ...employee, employeeType: e.target.value })
                }
              >
                <MenuItem value="fullTime">Full Time</MenuItem>
                <MenuItem value="partTime">Part Time</MenuItem>
                <MenuItem value="contract">Contract</MenuItem>
                <MenuItem value="seasonal">Seasonal</MenuItem>
              </Select>
            </div>
          </div>

          <Button onClick={(e) => createEmployee(e)}> Add Employee </Button>
        </form>
      </div>
  </animated.div>
     
    </>
  );
};

export default EmployeeCreate;
