import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EmployeeDirectory from "./components/EmployeeDirectory";
import EmployeeCreate from "./components/EmployeeCreate";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeDetails from "./components/EmployeeDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <header>Employee Dataset</header>


          <EmployeeDirectory></EmployeeDirectory> */}

        <Switch>
          <Route exact path="/" component={EmployeeDirectory}></Route>
          <Route
            exact
            path="/createemployee"
            component={EmployeeCreate}
          ></Route>
          <Route exact path="/showemployee" component={EmployeeTable}></Route>
          <Route exact path="/employee/:id" component={EmployeeDetails}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
