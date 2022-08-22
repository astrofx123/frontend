import { React, useEffect, useState } from "react";
import Nav from "./Nav";
import "../style/employeeDetails.css";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const EmployeeDetails = (location) => {
  const [employeeDetail, setemployeeDetail] = useState({});
  const [isEditingMode, setisEditingMode] = useState(false);
  const [isRetiered, setisRetiered] = useState(false);
  const [timeLeft, settimeLeft] = useState({
    days: "0",
    months: "0",
    years: "0",
  });

  const [updatedValues, setupdatedValues] = useState({
    title: "",
    department: "",
    currentStatus: "",
  });

  const editEmployee = () => {
    setupdatedValues({
      title: employeeDetail.title,
      department: employeeDetail.department,
      currentStatus: employeeDetail.currentStatus,
    });
    setisEditingMode(true);
  };

  const editEmployeeDone = () => {
    setisEditingMode(false);

    const editEmployeeQuery = {
      query: `mutation{
        editEmployee(employeeId : "${employeeDetail._id}" , updatedTitle :"${updatedValues.title}" ,updatedDepartment :"${updatedValues.department}" , updatedCurrentStatus :"${updatedValues.currentStatus}"){
          _id,
          firstName,
          lastName,
          age,
          title,  
          dateOfJoining,
          department,
          employeeType,
          currentStatus
        }
      }`,
    };

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(editEmployeeQuery),
      headers: {
        "Content-Type": "application/json",
      },
    });

    window.location.reload();
  };

  const cancelEditing = () => {
    setisEditingMode(false);
  };

  useEffect(() => {
    console.log(location.match.params);
    const getEmployeeById = {
      query: ` query {
                  getEmployeeById(employeeId : "${location.match.params.id}"){
                      _id,
                      firstName,
                      lastName,
                      age,
                      title,
                      dateOfJoining,
                      department,
                      employeeType,
                      currentStatus
                  }
              }`,
    };

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getEmployeeById),
    })
      .then((response) => {
        console.log(response);

        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setemployeeDetail(data.data.getEmployeeById);
        // console.log(employeeDetail);
        console.log(employeeDetail.dateOfJoining);
        checkDate(
          data.data.getEmployeeById.dateOfJoining,
          data.data.getEmployeeById.age
        );
      });
  }, []);

  const checkDate = (date, age) => {
    // console.log(new Date(date));

    // current date
    const currentDate = new Date();
    // joining date
    const joinDate = new Date(date);
    console.log(`age : ${age}`);
    // this many year employee has work till now

    // this many years the employee is going to work
    const remainingYears = 65 - age;
    console.log(`remaining years : ${remainingYears}`);

    const endDate = new Date(joinDate);
    // on this date employee will retire , adding remaining years to current date
    console.log(endDate.getFullYear() + remainingYears);
    endDate.setFullYear(joinDate.getFullYear() + remainingYears);

    // console.log(`joining date ${joinDate}`);
    // console.log(`joining date ${joinDate.getDate()}`);
    // console.log(`joining Month ${joinDate.getMonth()}`);
    // console.log(`joining Year ${joinDate.getFullYear()}`);

    console.log(
      `Join date : ${joinDate.getDate()} / ${joinDate.getMonth()} / ${joinDate.getFullYear()} `
    );

   

    console.log(
      `End Date : ${endDate.getDate()} / ${endDate.getMonth()} / ${endDate.getFullYear()} `
    );

    var d = 0,
      m = 0,
      y = 0;

      if(endDate.getFullYear()  < currentDate.getFullYear()){
        settimeLeft({
          days: 0,
          months: 0,
          years: 0,
        });

        return;
      }

    if (endDate.getDate() < currentDate.getDate()) {
      m = -1;

      d =
        new Date(endDate.getFullYear, endDate.getMonth(), 0) -
        (currentDate.getDate() - endDate.getDate());
      console.log(currentDate.getDate() - endDate.getDate());
      console.log(d);
    } else {
      d = endDate.getDate() - currentDate.getDate();
      console.log(d);
    }

    if (endDate.getMonth() < currentDate.getMonth() - 1) {
      y = y - 1;

      m = 12 + m + endDate.getMonth() - currentDate.getMonth();
      console.log(m);
    } else {
      d = endDate.getMonth() - currentDate.getMonth();
      console.log(m);
    }

    y = y + (endDate.getFullYear() - currentDate.getFullYear());
    console.log(y);

    settimeLeft({
      days: d,
      months: m,
      years: y,
    });
    // const remainingMonths =
    //   endDate.getMonth() -
    //   joinDate.getMonth() +
    //   12 * (endDate.getFullYear() - joinDateYear);
  };
  return (
    <>
      <Nav></Nav>
      <div className="employee-details-component">
        {/* <header> Employee details </header> */}

        {employeeDetail === {} ? (
          "Loading"
        ) : (
          <div className="employee-details">
            <span className="employee-name">
              {employeeDetail.firstName} {employeeDetail.lastName}{" "}
              {isEditingMode ? (
                ""
              ) : (
                <IconButton onClick={editEmployee}>
                  <EditIcon>
                    {/* <Link to={`/employee/${e._id}`}> Get Details </Link>{" "} */}
                  </EditIcon>
                </IconButton>
                // <button onClick={editEmployee}> Edit</button>
              )}
            </span>

            <div className="details-field">
              <InputLabel id="demo-simple-select-label">ID</InputLabel>
              <span className="details-field-value">
                {" "}
                {employeeDetail._id}{" "}
              </span>
            </div>

            <div className="details-field">
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <span className="details-field-value">
                {" "}
                {employeeDetail.age}{" "}
              </span>
            </div>
            <div className="details-field">
              <InputLabel id="demo-simple-select-label">
                Date Of Joining
              </InputLabel>
              <span className="details-field-value">
                {" "}
                {employeeDetail.dateOfJoining}{" "}
              </span>
            </div>

            <div className="details-field">
              <InputLabel id="demo-simple-select-label">
                Date Of Joining
              </InputLabel>
              <span className="details-field-value">
                {" "}
                {employeeDetail.dateOfJoining}{" "}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                // backgroundColor: "grey",
                width: "120%",
              }}
            >
              <div className="details-field">
                <InputLabel id="demo-simple-select-label">Title</InputLabel>

                <span className="details-field-value">
                  {isEditingMode ? (
                    <div className="form-control">
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={
                          updatedValues.title === ""
                            ? employeeDetail.title
                            : updatedValues.title
                        }
                        onChange={(e) =>
                          setupdatedValues({
                            ...updatedValues,
                            title: e.target.value,
                          })
                        }
                      >
                        <MenuItem value="employee">Employee</MenuItem>
                        <MenuItem value="manager">Manager</MenuItem>
                        <MenuItem value="director">Director</MenuItem>
                        <MenuItem value="vp">VP</MenuItem>
                      </Select>
                    </div>
                  ) : (
                    employeeDetail.title
                  )}
                </span>
              </div>
              <div className="details-field">
                <InputLabel id="demo-simple-select-label">
                  Department
                </InputLabel>
                <span className="details-field-value">
                  {" "}
                  {isEditingMode ? (
                    <div className="form-control">
                      <div className="form-control">
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={
                            updatedValues.department === ""
                              ? employeeDetail.department
                              : updatedValues.department
                          }
                          label="Department"
                          onChange={(e) =>
                            setupdatedValues({
                              ...updatedValues,
                              department: e.target.value,
                            })
                          }
                        >
                          <MenuItem value="it">IT</MenuItem>
                          <MenuItem value="marketing">Marketing</MenuItem>
                          <MenuItem value="hr">HR</MenuItem>
                          <MenuItem value="engineering">Engineering</MenuItem>
                        </Select>
                      </div>
                    </div>
                  ) : (
                    employeeDetail.department
                  )}
                </span>
              </div>
              <div className="details-field">
                <InputLabel id="demo-simple-select-label">
                  Employee Type
                </InputLabel>
                <span className="details-field-value">
                  {" "}
                  {employeeDetail.employeeType}{" "}
                </span>
              </div>
            </div>

            <div className="details-field">
              <InputLabel id="demo-simple-select-label">
                Current Status
              </InputLabel>
              <span className="details-field-value">
                {" "}
                {/* {employeeDetail.employeeType}{" "} */}
                {/* {employeeDetail.currentStatus} */}
                {isEditingMode ? (
                  <div className="form-control">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Current Status"
                      value={
                        updatedValues.currentStatus === ""
                          ? employeeDetail.currentStatus
                          : updatedValues.currentStatus
                      }
                      onChange={(e) =>
                        setupdatedValues({
                          ...updatedValues,
                          currentStatus: e.target.value,
                        })
                      }
                    >
                      {/* <option value="1">Working</option>
                      <option value="0">Not Working</option> */}
                      <MenuItem value={1}>Working</MenuItem>
                      <MenuItem value={0}>Not Working</MenuItem>
                    </Select>
                    {/* <label htmlFor="title">Title</label>
                    <select
                      value={
                        updatedValues.currentStatus === ""
                          ? employeeDetail.currentStatus
                          : updatedValues.currentStatus
                      }
                      onChange={(e) =>
                        setupdatedValues({
                          ...updatedValues,
                          currentStatus: e.target.value,
                        })
                      }
                    >
                      <option value="1">Working</option>
                      <option value="0">Not Working</option>
                    </select> */}
                  </div>
                ) : employeeDetail.currentStatus === "1" ? (
                  "Working"
                ) : (
                  "Not Working"
                )}
              </span>
            </div>
            {isRetiered ? (
              "Retiered"
            ) : (
              <div>
                <InputLabel id="demo-simple-select-label">
                  Retierment Status
                </InputLabel>
                <span className="time-highlight">{timeLeft.days}</span>
                days <span className="time-highlight">
                  {timeLeft.months}
                </span>{" "}
                months{" "}
                <span className="time-highlight">{timeLeft.years} years</span>{" "}
                Left For Your Retierment
              </div>
            )}

            {isEditingMode ? (
              <div>
                <Button onClick={editEmployeeDone} variant="contained">
                  Done Editing
                </Button>
                {/* <button >Done Editing</button> */}
                <Button onClick={cancelEditing}> Cancel </Button>
                {/* <button > Cancel</button> */}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default EmployeeDetails;
