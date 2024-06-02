import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/system";
import { Card, CardBody, Spacer } from "@nextui-org/react";

const whiteLogos = [
  "/svg/hardhat.svg",
  "/svg/blockchain.svg",
  "/svg/ethereum.svg",
  "/svg/ipfs.svg",
  "/svg/ai.svg",
  "/svg/dev.svg",
];

const darkLogos = [
  "/svg/hardhat.svg",
  "/svg/blockchain.svg",
  "/svg/ethereum.svg",
  "/svg/ipfs.svg",
  "/svg/ai.svg",
  "/svg/dev.svg",
];

const logoStyle = {
  width: "200px",
  height: "150px",
  margin: "16px",
  opacity: 0.7,
};

export default function LogoCollection() {
  const theme = useTheme();
  const logos = theme.palette.mode === "light" ? darkLogos : whiteLogos;

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Spacer y={-15} />

      <Card
        isHoverable
        shadow="lg"
        isFooterBlurred
        radius="lg"
        className="border-none"
      >
        <CardBody>
          <Typography
            component="p"
            variant="h2"
            align="center"
            color="text.secondary"
            gutterBottom
          >
            The technology used in Brossiya
          </Typography>

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {logos.map((logo, index) => (
              <Grid item key={index}>
                <img src={logo} alt={`Logo ${index + 1}`} style={logoStyle} />
              </Grid>
            ))}
          </Grid>
        </CardBody>
      </Card>
      <Card></Card>
    </Box>
  );
}
