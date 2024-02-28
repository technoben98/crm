import { Avatar, Box, Button, ButtonGroup } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  // const { isMenuOpen, setMenuOpen } = useState(false);

  return (
    <Box
      height={"50px"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box className="NavBarLeftSide">
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          style={{ marginLeft: "5px" }}
        >
          <Link to={"/leads"}>
            <Button>Leads</Button>
          </Link>
          <Link to={"/deals"}>
            <Button>Deal</Button>
          </Link>
          <Link to={"/reportings"}>
            <Button>Reporting</Button>
          </Link>
        </ButtonGroup>
      </Box>

      <Box className="NavBarCenter">
        <h1 style={{ margin: "0", padding: 0 }}>
          {props.pageName || "NavBar"}
        </h1>
      </Box>

      <Box
        className="NavBarRightSide"
        display={"flex"}
        alignItems={"center"}
        padding={"20px, 0"}
      >
        <Avatar>U</Avatar>
        <p style={{ padding: "10px" }}>Username</p>
      </Box>
    </Box>
  );
};

export default NavBar;
