import React, { useState } from 'react';
import { Accordion, AccordionItem, Spacer } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon";

import { Chip } from "@nextui-org/react";

import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {Spinner} from "@nextui-org/react";
import FullScreenDialog from "./FullScreenDialog";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import {Progress} from "@nextui-org/react";




// Example function to check deadlines, replace with your actual implementation
const checkDeadline = (date) => {
  // Dummy implementation, replace with actual logic
  const deadline = new Date(date);
  return deadline < new Date() ? "Hors délai" : "Within deadline";
};




export default function ResearchViolations() {
  const [searchField, setSearchField] = useState("");
  const [infractionData, setInfractionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [dataa, setDataa] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const [value, setValue] = React.useState(0);


  const handleClose = () => {
    setOpen(false);
  };

  function t  (){onClose



  }
  
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
const handleOpenn = () => {
  onOpen();
};


  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/fetchAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_of_infraction: searchField }),
      });
      const data = await response.json();
      if (response.ok) {
        setInfractionData(data.infractionData);
      } else if (response.status === 404) {
        setError("Infraction not found");
      } else {
        setError(data.message || 'Error fetching data');
      }
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const searchList = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full">
          <Spinner label="Loading..." color="warning" />
        </div>
      );
    }
    if (error) {
     
      return(
        <>     


 <Accordion variant="splitted">
          <AccordionItem
          isDisabled
            key="1"
           
            aria-label="Accordion 1"
            color="danger"
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
                           
                            <Chip variant="faded" color="danger">
                            Cette violation n'a pas été trouvée dans le système
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
 </AccordionItem>
        </Accordion>

        </>
      );
    }
    if (infractionData) {
      const colorspe = checkDeadline(infractionData.infraction.date_of_violation) === "Hors délai" ? "danger" : "primary";
      const chipStatus = checkDeadline(infractionData.infraction.date_of_violation);
      return (
        <Accordion variant="splitted">
          <AccordionItem
            key={infractionData.infraction.id_of_infraction}
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
                              {infractionData.infraction.id_of_infraction}
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
                      <b>Id contravention</b>{" "}
                    </TableCell>
                    <TableCell>
                      <Chip variant="faded" color={colorspe}>
                        {infractionData.infraction.id_of_infraction}
                      </Chip>
                    </TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>Type</TableCell>
                    <TableCell>
                      {" "}
                      <b> {infractionData.infraction.type_infraction} </b>
                    </TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>Date</TableCell>
                    <TableCell>
                      {" "}
                      <b> {infractionData.infraction.date_of_violation} </b>
                    </TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>Heure</TableCell>
                    <TableCell>
                      {" "}
                      <b> {infractionData.infraction.time_of_violation} </b>
                    </TableCell>
                  </TableRow>
                  <TableRow key="5">
                    <TableCell>Matricule</TableCell>
                    <TableCell>
                      {" "}
                      <b>
                        {" "}
                        {infractionData.infraction.infraction_car_plate_number}{" "}
                      </b>
                    </TableCell>
                  </TableRow>
                  <TableRow key="6">
                    <TableCell>Adress</TableCell>
                    <TableCell>
                      {" "}
                      <b> {infractionData.infraction.location_address} </b>
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
                      infractionData.infraction.id_of_infraction,
                      infractionData.infraction.infraction_link_blockchain
                    );
                  }}
                >
                  A voir plus.
                </Button>
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      );
    }
    return null;
  };
   // Render loading state if loading is true
   if (open) {
    return (
      <div>
        <Spacer y={8} />
        <FullScreenDialog handleClose={handleClose} dataa={dataa} />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-[400px] w-full">
        <CardHeader className="flex gap-3">
          <img
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://static.thenounproject.com/png/176556-200.png"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">Infraction Search</p>
            <p className="text-small text-default-500">Enter the infraction ID</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col gap-3">
            <Input
              className="pa3 bb br3 grow b--none bg-lightest-blue"
              label="search"
              onChange={handleChange}
              isClearable
        radius="lg"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Type to search..."
        startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
            />
            <Button color="success" onClick={handleSearch}>Search</Button>
          </div>
          <div className="mt-4">
            {searchList()}
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/your-repo"
          >
            Visit source code on GitHub.
          </Link>
        </CardFooter>
      </Card>



     
    </div>
   
  );
}