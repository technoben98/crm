import { Box, createTheme } from "@mui/material";
import NavBar from "../NavBarComponent/NavBar";
import TableComponent from "./Table";
import jsonData from "../../source/LeadsDB.json";
import DealStageDB from "../../source/DealStageDB.json";
import CountriesDB from "../../source/CountriesDB.json";
import LeadStatusDB from "../../source/LeadStatusDB.json";
import Stats from "./Stats";

const ListOfLeads = (props) => {
  const columns = [
    "Creation/Update Date",
    "Campus",
    "Full Name",
    "Contact Owner",
    "Deal",
    "Lead Status",
    "Source",
    "Form",
  ];

  const selectColumns = ["Campus", "Contact Owner", "Deal", "Lead Status"];

  const selectOptions = {
    "Lead Status": LeadStatusDB,
    Campus: CountriesDB,
    "Contact Owner": ["Olga", "Lital", "Awner"],
    Deal: DealStageDB,
  };
  return (
    <Box>
      <NavBar pageName="Leads" />
      <Box>
        <Stats />
      </Box>
      <TableComponent
        data={jsonData}
        columns={columns}
        selectColumns={selectColumns}
        selectOptions={selectOptions}
      />
    </Box>
  );
};
export default ListOfLeads;
