import * as React from "react";
import { useState } from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Card,
  CardFooter,
  Image,
  Button,
  Divider,
  Link,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import { Spacer, Chip } from "@nextui-org/react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function TabPayment({ data }) {
  const [loading, setLoading] = useState(false);

  async function handlePay(id_of_infraction, infraction_link_blockchain) {
    try {
      setLoading(true);
      const response = await fetch("/api/paye", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          infraction_link_blockchain,
          id_of_infraction,
        }),
      });
      if (response.ok) {
        // Payment successful, reload the page
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        // Handle error condition here
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error condition here
    } finally {
      setLoading(false);
    }
  }

  const openPaymentPage = () => {
    window.open(
      "https://pay.chargily.com/test/payment-links/01hybbstqnh9g8hzdy82c0b7n4",
      "_blank"
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Spacer x={380} />
        <Grid xs={20} md={10} lg={7}>
          <Item>
            <Card radius="lg" className="border-none">
              <img
                alt="Woman listing to music"
                className="object-cover"
                height={200}
                src="https://www.pinelabs.com/img/blog/online-payments_mode-banner.webp"
                width={1200}
              />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">Status : </p>
                <Button
                  className="text-tiny text-white bg-black/20"
                  variant="flat"
                  color="default"
                  radius="lg"
                  size="sm"
                >
                  <Chip color="danger" variant="shadow">
                    Non Payé
                  </Chip>
                </Button>
              </CardFooter>
            </Card>
            <Item>
              <Card className="max-w-[400px]">
                <CardBody className="flex gap-3">
                  <div className="flex items-center">
                    <img
                      alt="nextui logo"
                      height={40}
                      radius="sm"
                      src="https://cdn-icons-png.flaticon.com/512/1019/1019607.png"
                      width={40}
                    />
                    <div className="flex flex-col ml-2">
                      <p
                        className="text-md font-bold"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                        }}
                      >
                        <b> Montant a Payé</b>
                      </p>
                      <p
                        className="text-small text-default-500"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          color: "#6B7280",
                        }}
                      >
                        <Chip variant="faded" color="danger">
                          2000 DA
                        </Chip>
                      </p>
                    </div>
                  </div>
                  <Divider />
                  <div className="flex items-center">
                    <img
                      alt="nextui logo"
                      height={60}
                      radius="sm"
                      src="https://as1.ftcdn.net/v2/jpg/02/87/14/50/1000_F_287145052_8zwwDbYp7pEhJL10HASNNznh9mG9HRNF.jpg"
                      width={60}
                    />
                    <div className="flex flex-col ml-2">
                      <p
                        className="text-md font-bold"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                        }}
                      >
                        <b> Jours restants</b>
                      </p>
                      <p
                        className="text-small text-default-500"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          color: "#6B7280",
                        }}
                      >
                        <Chip variant="faded" color="success">
                          11 jours
                        </Chip>
                      </p>
                    </div>
                  </div>
                  <Divider />
                  <div className="flex items-center">
                    <img
                      alt="nextui logo"
                      height={40}
                      radius="sm"
                      src="https://w7.pngwing.com/pngs/812/514/png-transparent-computer-icons-icon-design-information-hunde-logo-business-aqua.png"
                      width={40}
                    />
                    <div className="flex flex-col ml-2">
                      <p
                        className="text-md font-bold"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          color: "#1E3A8A",
                        }}
                      >
                        Vous pouvez payer lamende des maintenant en tout
                        sécurité
                      </p>
                      <p
                        className="text-small text-default-500"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          color: "#6B7280",
                        }}
                      ></p>
                    </div>
                  </div>
                </CardBody>
                <Divider />
              </Card>
            </Item>
            <Spacer y={4} />

            <Button
              color="success"
              className="w-full"
              onClick={() => {
                openPaymentPage();
                handlePay(
                  data.id_of_infraction,
                  data.infraction_link_blockchain
                );
              }}
              disabled={loading}
            >
              {loading ? "Paying..." : "Pay"}
            </Button>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
