import { Route, Routes } from "react-router-dom";
import "./App.css";
import ListOfLeads from "./Components/LeadsComponent/ListOfLeads";
// import Login from "./Components/LoginComponent/Login";
// import NavBar from "./Components/NavBar";
import Deal from "./Components/DealComponent/DealPage";
import Reporting from "./Components/ReportingComponent/Reporting";
import LeadDetailsPage from "./Components/LeadDetailsComponent/LeadDetailsPage";

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <NavBar /> */}
      {/* <ListOfLeads /> */}
      <Routes>
        <Route path="/leads" Component={ListOfLeads}></Route>
        <Route path="/lead/:id" Component={LeadDetailsPage}></Route>
        <Route path="/deals" Component={Deal}></Route>
        <Route path="/reportings" Component={Reporting}></Route>
      </Routes>
    </div>
  );
}

export default App;
