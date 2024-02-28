import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <Box>
        <h1>Login page</h1>
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={"20%"}
          margin={"auto"}
          padding={"1em"}
        >
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            style={{ margin: "10px" }}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            style={{ margin: "10px" }}
          />
          <Button
            onClick={navigate("/leads")}
            variant="outlined"
            style={{ margin: "10px" }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </div>
  );
};
export default Login;
