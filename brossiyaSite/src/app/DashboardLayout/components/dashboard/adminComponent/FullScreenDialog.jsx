import { Button } from "@nextui-org/react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import * as React from "react";
import PropTypes from "prop-types";
import TabInfo from "./TabInfo";
import Tabvoiture from "./Tabvoiture";
import TabViolation from "./TabViolation";
import ImageViolation from "./ImageViolation";
import Map from "./Map";
import TimeLineInfraction from "./TimeLineInfraction";


export default function FullScreenDialog({ handleClose, dataa }) {
  const [value, setValue] = React.useState(0);
 
  const [status, setStatus] = React.useState(null);

  React.useEffect(() => {
    if (dataa && dataa.Infraction && dataa.Infraction.data_of_infraction) {
      const { status } =
        dataa.Infraction.data_of_infraction.status_of_infraction;
      setStatus(status);

     
    }
  }, [dataa]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!dataa) {
    return <div>Error: Data is missing or incorrect.</div>;
  }

  const { Infraction } = dataa;
  const { data_of_infraction } = Infraction;

  if (!data_of_infraction) {
    return <div>Error: Infraction data is missing or incorrect.</div>;
  }

  const tabs = [
    {
      label: "Information Personelle",
      component: <TabInfo data={Infraction.owner} />,
      show: true,
    },
    {
      label: "Voiture Info",
      component: <Tabvoiture data={Infraction.car.car} />,
      show: true,
    },
    {
      label: "Violation Info",
      component: <TabViolation data={Infraction} />,
      show: true,
    },
    {
      label: "Violation Image",
      component: <ImageViolation data={Infraction.hash_image_ipfs} />,
      show: true,
    },
    {
      label: "Coordination GPS",
      component: (
        <div className="w-[100%] h-[50vh]">
          <Map />
        </div>
      ),
      show: true,
    },
    {
      label: "chronologie de la violation",
      component: <TimeLineInfraction data={Infraction} />,
      show: true,
    },
   
   
  ];

  const visibleTabs = tabs.filter((tab) => tab.show);

  return (
    <Dialog fullScreen open={true}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            {/* Add an icon inside IconButton, e.g., <CloseIcon /> */}
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Infractions
          </Typography>
          <Button color="danger" onPress={handleClose}>
            Fermer
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            {visibleTabs.map((tab, index) => (
              <Tab key={index} label={tab.label} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Box>
        {visibleTabs.map((tab, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            {tab.component}
          </CustomTabPanel>
        ))}
      </Box>
    </Dialog>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
