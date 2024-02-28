import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import NavBar from "../NavBarComponent/NavBar";
import LeadDetailsDB from "../../source/LeadDetailsDB.json";
import CountriesDB from "../../source/CountriesDB.json";
import ContactOwnerDB from "../../source/ContactOwnersDB.json";
import LeadStatusDB from "../../source/LeadStatusDB.json";
import DealStageDB from "../../source/DealStageDB.json";
import DependentPropertiesDB from "../../source/DependentPropertiesDB.json";
import { useEffect, useState } from "react";
import "./LeadDetailsPage.css";
const LeadDetailsPage = () => {
  const { id } = useParams();
  // Overlay states
  const [isGeneralInfoOpen, setIsGeneralInfoOpen] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [isDealOverlay, setIsDealOverlay] = useState(false);
  // Left panel states
  const [firstName, setFirstName] = useState(LeadDetailsDB["First name"]);
  const [lastName, setLastName] = useState(LeadDetailsDB["Last name"]);
  const [email, setEmail] = useState(LeadDetailsDB["Email"]);
  const [mobilePhone, setMobilePhone] = useState(LeadDetailsDB["Mobile phone"]);
  const [phoneNumber, setPhoneNumber] = useState(LeadDetailsDB["Phone number"]);
  const [contactOwner, setContactOwner] = useState(
    LeadDetailsDB["Contact Owner"]
  );
  const [campus, setCampus] = useState(LeadDetailsDB["Campus"]);
  const [leadStatus, setLeadStatus] = useState(LeadDetailsDB["Lead Status"]);
  const [reasonRefusal, setReasonRefusal] = useState(
    LeadDetailsDB["Reason refusal DI"]
  );
  const LeadForm = LeadDetailsDB.FormAnswers;
  // Create deal states
  const [dealName, setDealName] = useState(LeadDetailsDB["Full Name"]);
  const [dealStage, setDealStage] = useState(LeadDetailsDB["Deal"]);
  const [isDependentProperties, setIsDependentProperties] = useState(false);
  const [dependentProperties, setDependentProperties] = useState([]);
  const [priority, setPriority] = useState(LeadDetailsDB.Priority);
  const [cohort, setCohort] = useState(LeadDetailsDB["Cohort#"]);
  const [amount, setAmount] = useState(LeadDetailsDB.Amount);
  const [currency, setCurrency] = useState(LeadDetailsDB.Currency);

  useEffect(() => {
    if (dealStage === "Interview #1" || "Interview #2") {
      setIsDependentProperties(true);
      setDependentProperties(DependentPropertiesDB.interviews);
    } else if (dealStage === "Contract send") {
      setIsDependentProperties(true);
      setDependentProperties(DependentPropertiesDB["Contract send"]);
    } else if (dealStage === "Closed won" || "Closed lost") {
      setIsDependentProperties(true);
      setDependentProperties(DependentPropertiesDB.Closed);
    } else {
      setIsDependentProperties(false);
      setDependentProperties("");
    }
  }, [dealStage]);

  return (
    <Box height={"90vh"}>
      <NavBar pageName={`Lead: ${LeadDetailsDB["Full Name"]}`} />
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        margin={"10px"}
        height={"100%"}
        maxHeight={"100%"}
      >
        <Box
          className="left"
          width={"25%"}
          bgcolor={"yellow"}
          border={"1px solid black"}
          maxHeight={"100%"}
        >
          <Box
            className="shortInfo"
            padding={"5px"}
            borderBottom={"1px solid black"}
          >
            <Box className="avatar" display={"flex"}>
              <Avatar style={{ margin: "10px" }}>NS</Avatar>
              <Box margin={"10px"}>
                <Typography textAlign={"left"} fontSize={"1.1rem"}>
                  {LeadDetailsDB["Full Name"]}
                </Typography>
                <Typography fontSize={"0.9rem"}>
                  {LeadDetailsDB["Email"]}
                </Typography>
              </Box>
            </Box>
            <ButtonGroup variant="contained" aria-label="outlined button group">
              <Button>Note</Button>
              <Button>Email</Button>
              <Button>Call</Button>
              <Button>Task</Button>
              <Button>Meeting</Button>
              <Button>More</Button>
            </ButtonGroup>
          </Box>
          <Box borderBottom={"1px solid black"}>
            <Typography
              fontSize={"1.5rem"}
              fontWeight={"bold"}
              onClick={() => setIsGeneralInfoOpen(!isGeneralInfoOpen)}
              style={{ cursor: "pointer" }}
            >
              General information
            </Typography>
            <Box
              display={"flex"}
              flexDirection={"column"}
              className={`generalInfo ${isGeneralInfoOpen ? "" : "closed"}`}
            >
              <TextField
                id="firstName"
                label="First name"
                variant="filled"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <TextField
                id="lastName"
                label="Last name"
                variant="filled"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <TextField
                id="email"
                label="Email"
                variant="filled"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                id="mobilePhone"
                label="Mobile phone number"
                variant="filled"
                value={mobilePhone}
                onChange={(e) => {
                  setMobilePhone(e.target.value);
                }}
              />
              <TextField
                id="Phone Number"
                label="Phone number"
                variant="filled"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
              <FormControl variant="filled">
                <InputLabel id="contactOwner">Contact Owner</InputLabel>
                <Select
                  id="contactOwner"
                  variant="filled"
                  value={contactOwner}
                  style={{ textAlign: "left" }}
                  onChange={(e) => {
                    setContactOwner(e.target.value);
                  }}
                >
                  {ContactOwnerDB.map((option, optionIndex) => (
                    <MenuItem key={optionIndex} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="filled">
                <InputLabel id="campus">Campus</InputLabel>
                <Select
                  id="campus"
                  label="Campus"
                  labelId="campus"
                  variant="filled"
                  value={campus}
                  style={{ textAlign: "left" }}
                  onChange={(e) => {
                    setCampus(e.target.value);
                  }}
                >
                  {CountriesDB.map((option, optionIndex) => (
                    <MenuItem key={optionIndex} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="filled">
                <InputLabel id="leadStatus">Lead Status</InputLabel>
                <Select
                  id="leadStatus"
                  variant="filled"
                  value={leadStatus}
                  style={{ textAlign: "left" }}
                  onChange={(e) => {
                    setLeadStatus(e.target.value);
                  }}
                >
                  {LeadStatusDB.map((option, optionIndex) => (
                    <MenuItem key={optionIndex} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="reasonRefusal"
                label="Reason Refusal DI"
                variant="filled"
                value={reasonRefusal}
                onChange={(e) => {
                  setReasonRefusal(e.target.value);
                }}
              />
              <Button style={{ width: "20%", margin: "auto" }}>Save</Button>
            </Box>
          </Box>
          <Box borderBottom={"1px solid black"}>
            <Typography
              fontSize={"1.5rem"}
              fontWeight={"bold"}
              onClick={() => setIsFormOpen(!isFormOpen)}
              style={{ cursor: "pointer" }}
            >
              Application Form
            </Typography>
            <Box
              display={"flex"}
              flexDirection={"column"}
              className={`form ${isFormOpen ? "" : "closed"}`}
            >
              {LeadForm &&
                Object.keys(LeadForm).map((questionId) => (
                  <TextField
                    key={questionId}
                    id={questionId}
                    label={questionId}
                    variant="filled"
                    value={LeadForm[questionId]}
                    onChange={(e) => {
                      // Realize logic for change answer on question... for example update states (useState())
                    }}
                  />
                ))}
            </Box>
          </Box>
        </Box>
        <Box
          className="center"
          bgcolor={"lightblue"}
          width={"50%"}
          border={"1px solid black"}
        >
          <p>Central panel</p>
        </Box>
        {/* Actions panel */}
        <Box
          className={`right ${
            isDealOverlay ? "overlayClosed" : "overlayOpened"
          }`}
          bgcolor={"lightgreen"}
          width={"25%"}
          border={"1px solid black"}
        >
          <h3>Actions panel</h3>
          <Box border={"1px solid black"} height={"10%"}>
            <Typography>Current Deal: {LeadDetailsDB.Deal}</Typography>
            <Button
              variant="contained"
              color="success"
              onClick={() => setIsDealOverlay(true)}
            >
              Create deal
            </Button>
          </Box>
        </Box>
        {/* Deal overlay */}
        <Box
          className={`right ${
            isDealOverlay ? "overlayOpened" : "overlayClosed"
          }`}
          bgcolor={"lightgreen"}
          width={"40%"}
          border={"1px solid black"}
        >
          <h2>Create deal</h2>

          <Box border={"1px solid black"}>
            <Typography>Deal overlay</Typography>
            <TextField
              id="dealName"
              label="Deal name"
              variant="filled"
              value={dealName}
              required={true}
              style={{ width: "100%" }}
              onChange={(e) => {
                setDealName(e.target.value);
              }}
            />
            <FormControl variant="filled" style={{ width: "100%" }}>
              <InputLabel id="dealStage">Deal stage</InputLabel>
              <Select
                id="dealStage"
                variant="filled"
                value={dealStage}
                style={{ textAlign: "left" }}
                onChange={(e) => {
                  setDealStage(e.target.value);
                }}
              >
                {DealStageDB.map((option, optionIndex) => (
                  <MenuItem key={optionIndex} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {isDependentProperties && (
              <Box>
                {dealStage === "Interview #1" ||
                dealStage === "Interview #2" ? (
                  <FormControl variant="filled" style={{ width: "100%" }}>
                    <InputLabel id="interviewType">Interview Type</InputLabel>
                    <Select
                      id="interviewType"
                      variant="filled"
                      value={dependentProperties.interviewType}
                      style={{ textAlign: "left" }}
                      onChange={(e) => {
                        // Handle changes in interview type
                        // e.g., setDependentProperties({ ...dependentProperties, interviewType: e.target.value });
                      }}
                    >
                      {/* Add options for interview types */}
                    </Select>
                  </FormControl>
                ) : dealStage === "Contract send" ? (
                  <TextField
                    id="contractDetails"
                    label="Contract Details"
                    variant="filled"
                    value={dependentProperties.contractDetails}
                    onChange={(e) => {
                      // Handle changes in contract details
                      // e.g., setDependentProperties({ ...dependentProperties, contractDetails: e.target.value });
                    }}
                  />
                ) : dealStage === "Closed won" ||
                  dealStage === "Closed lost" ? (
                  <TextField
                    id="closedDetails"
                    label="Closed Details"
                    variant="filled"
                    value={dependentProperties.closedDetails}
                    onChange={(e) => {
                      // Handle changes in closed details
                      // e.g., setDependentProperties({ ...dependentProperties, closedDetails: e.target.value });
                    }}
                  />
                ) : null}
              </Box>
            )}
            {/* <FormControl variant="filled" style={{ width: "100%" }}>
              <InputLabel id="dealStage">Deal stage</InputLabel>
              <Select
                id="dealStage"
                variant="filled"
                value={dealStage}
                style={{ textAlign: "left" }}
                onChange={(e) => {
                  setDealStage(e.target.value);
                }}
              >
                {DealStageDB.map((option, optionIndex) => (
                  <MenuItem key={optionIndex} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
            <FormControl variant="filled">
              <InputLabel id="contactOwner">Contact Owner</InputLabel>
              <Select
                id="contactOwner"
                variant="filled"
                value={contactOwner}
                style={{ textAlign: "left" }}
                onChange={(e) => {
                  setContactOwner(e.target.value);
                }}
              >
                {ContactOwnerDB.map((option, optionIndex) => (
                  <MenuItem key={optionIndex} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setIsDealOverlay(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" color="success">
                Create deal
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default LeadDetailsPage;
