import { Box } from "@mui/material";
import NavBar from "../NavBarComponent/NavBar";
import DragAndDropPage from "./DragAndDropPage";

const Deal = (props) => {
  return (
    <Box>
      <NavBar pageName="Deal" />
      <DragAndDropPage />
    </Box>
  );
};
export default Deal;
