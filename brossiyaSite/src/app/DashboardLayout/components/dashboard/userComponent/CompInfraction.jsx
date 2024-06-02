
import React from "react";
import { Accordion, AccordionItem, Spacer } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { Chip } from "@nextui-org/react";

import { Card, CardBody } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

import checkDeadline from "../../../../../services/checkDeadline.js";
import FullScreenDialog from "./FullScreenDialog";

import Slide from "@mui/material/Slide";
import { useState } from "react";


import { Spinner } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import {Progress} from "@nextui-org/react";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function CompInfraction({ data }) {
  const [open, setOpen] = React.useState(false);
  const [dataa, setDataa] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const [value, setValue] = React.useState(0);



  
  async function handleClickOpen(id_of_infraction, infraction_link_blockchain) {
    setLoading(true);
    try {


      const response = await fetch("/api/fetchInfraction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache", // Prevent caching
        },
        body: JSON.stringify({
          infraction_link_blockchain,
          id_of_infraction,
        }),
      });
      const responseData = await response.json();

      if (response.status === 200) {
        setDataa(responseData);
        setLoading(false);
        t()
        setOpen(true);
      } else {
        setDataa(null);

        setLoading(false);
        t()
        setOpen(false);
        setError(responseData.error || "Failed to fetch data");
      }
    } catch (error) {
      setError("An error occurred while fetching data");
    } finally {
    

     
    }
  }


function t  (){onClose



  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenn = () => {
    onOpen();
  };

  // Check if data is null or undefined
  if (!data) {
    return (
      <div>
        <div>
          <Spacer y={20} />{" "}
          <div className="max-w-[300px] w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12 bg-success" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg bg-success" />
              <Skeleton className="h-3 w-4/5 rounded-lg bg-success" />
            </div>
          </div>
        </div>
        <Spacer y={20} />
        <div>
          {" "}
          <div className="max-w-[300px] w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12 bg-primary" />
            </div>
            <div className="w-full flex flex-col gap-2 ">
              <Skeleton className="h-3 w-3/5 rounded-lg bg-primary" />
              <Skeleton className="h-3 w-4/5 rounded-lg bg-primary" />
            </div>
          </div>
        </div>
        <Spacer y={20} />
        <div>
          {" "}
          <div className="max-w-[300px] w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12 bg-success" />
            </div>
            <div className="w-full flex flex-col gap-2 ">
              <Skeleton className="h-3 w-3/5 rounded-lg bg-success" />
              <Skeleton className="h-3 w-4/5 rounded-lg bg-success" />
            </div>
          </div>
        </div>
        <Spacer y={20} />
        <div>
          {" "}
          <div className="max-w-[300px] w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12 bg-primary" />
            </div>
            <div className="w-full flex flex-col gap-2 ">
              <Skeleton className="h-3 w-3/5 rounded-lg bg-primary" />
              <Skeleton className="h-3 w-4/5 rounded-lg bg-primary" />
            </div>
          </div>
        </div>
        <Spacer y={20} />
      </div>
    );
  }

  // Check if data is an array
  if (!Array.isArray(data)) {
    return <div>Problem</div>;
  }

  // Render loading state if loading is true
  if (loading) {
    return (
      <div>
        <Spacer y={8} />
        <Modal  backdrop="blur" size={size} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                Voulez Patienter Les Données Sera Téléchargé De La Blockchain
                </ModalHeader>
                <ModalBody>
                <Spinner label="Loading..." color="warning" />


              
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }
  // Render loading state if loading is true
  if (open) {
    return (
      <div>
        <Spacer y={8} />
        <FullScreenDialog handleClose={handleClose} dataa={dataa} />
      </div>
    );
  }

  if(error){
    setTimeout(() => {
      if (true) {
     setValue(99)
       
     setTimeout(() => {
      if (true) {
     
        setValue(60)

        setTimeout(() => {
          if (true) {
         
            setValue(10)
    
            setError(null)
          }
        }, 5000); // Navigate back after 5 seconds
    

      }
    }, 5000); // Navigate back after 5 seconds
      }
    }, 1000); // Navigate back after 5 seconds

   

   
   
   
    return (
      <div>
        <Spacer y={8} />
        <Modal  backdrop="blur" size={size} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                Il Y A Quelque Chose A Survenu 
                </ModalHeader>
                <ModalBody>
                <Spinner label="EROOR..... Essayez a nouveau" color="danger" />
                <Progress
      aria-label="Essayez a nouveau "
      size="md"
      value={value}
      color="danger"
      showValueLabel={true}
      className="max-w-md"
    />
               


              
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }








  return (
    <>
      <Accordion variant="splitted">
        {data.map((infraction, index) => {
          let colorspe = "primary";
          let res = checkDeadline(infraction.infraction.date_of_violation);
          let chipStatus = "";
          if (res === "Hors délai") {
            colorspe = "danger";
            chipStatus = "Hors délai";
          } else {
            chipStatus = res;
          }
          return (
            
            <AccordionItem
              key={index}
              startContent={<Chip color={colorspe}>{chipStatus}</Chip>}
              aria-label="Accordion 1"
              color={colorspe}
              title={
                <Card
                  isBlurred
                  className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                  shadow="sm"
                >
                  <CardBody>
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                      <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col gap-0">
                            <h3 className="font-semibold text-foreground/90">
                              ID CONTRAVENTIONS:
                              <Chip variant="faded" color={colorspe}>
                                {infraction.infraction.id_of_infraction}
                              </Chip>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              }
            >
              <div className="flex flex-col gap-3">
                <Table
                  color={colorspe}
                  selectionMode="single"
                  defaultSelectedKeys={["2"]}
                  aria-label="Example static collection table"
                >
                  <TableHeader>
                    <TableColumn>info</TableColumn>
                    <TableColumn>value</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell>
                        <b>Id contravention </b>{" "}
                      </TableCell>
                      <TableCell>
                        <Chip variant="faded" color={colorspe}>
                          {infraction.infraction.id_of_infraction}
                        </Chip>
                      </TableCell>
                    </TableRow>
                    <TableRow key="2">
                      <TableCell>Type</TableCell>
                      <TableCell>
                        {" "}
                        <b> {infraction.infraction.type_infraction} </b>
                      </TableCell>
                    </TableRow>
                    <TableRow key="3">
                      <TableCell>Date</TableCell>
                      <TableCell>
                        {" "}
                        <b> {infraction.infraction.date_of_violation} </b>
                      </TableCell>
                    </TableRow>
                    <TableRow key="4">
                      <TableCell>Heure</TableCell>
                      <TableCell>
                        {" "}
                        <b> {infraction.infraction.time_of_violation} </b>
                      </TableCell>
                    </TableRow>
                    <TableRow key="5">
                      <TableCell>Matricule</TableCell>
                      <TableCell>
                        {" "}
                        <b>
                          {" "}
                          {
                            infraction.infraction.infraction_car_plate_number
                          }{" "}
                        </b>
                      </TableCell>
                    </TableRow>
                    <TableRow key="6">
                      <TableCell>Adress</TableCell>
                      <TableCell>
                        {" "}
                        <b> {infraction.infraction.location_address} </b>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div>
                  <Button
                    color={colorspe}
                    className="w-full"
                    onPress={() => {
                      handleOpenn();

                      handleClickOpen(
                        infraction.infraction.id_of_infraction,
                        infraction.infraction.infraction_link_blockchain
                      );
                    }}
                  >
                    A voir plus
                  </Button>
                 
                </div>
              </div>
            </AccordionItem>
            

            
          );
        })}
        
      </Accordion>
    </>
  );
}
