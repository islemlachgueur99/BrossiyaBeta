import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import {Spacer} from "@nextui-org/react";

export default function TabInfo({data}) {
  return (
    <>
      <Spacer y={10} />
      <Table
        color="warning"
        selectionMode="single"
        defaultSelectedKeys={["2"]}
        aria-label="Example static collection table"
        radius="lg"
        shadow="lg"
      >
        <TableHeader color="warning">
        <TableColumn>Info</TableColumn>
        <TableColumn></TableColumn>
        <TableColumn>المعلومات</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Marque </TableCell>
          <TableCell>{data.Brand}</TableCell>
          <TableCell>العلامة</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Modele</TableCell>
          <TableCell>{data.model}</TableCell>
          <TableCell>النوع</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Année</TableCell>
          <TableCell>{data.year}</TableCell>
          <TableCell>السنة</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>Couleur</TableCell>
          <TableCell>{data.color}</TableCell>
          <TableCell>اللون</TableCell>
        </TableRow>
        <TableRow key="5">
          <TableCell>Numéro De Plaque</TableCell>
          <TableCell>{data.license_plate_number}</TableCell>
          <TableCell>رقم لوحة</TableCell>
        </TableRow>
        <TableRow key="6">
          <TableCell>Numéro De Série</TableCell>
          <TableCell>{data.serial_number}</TableCell>
          <TableCell> الرقم التسلسلي</TableCell>
        </TableRow>
        <TableRow key="7">
          <TableCell>propriétaire de voiture</TableCell>
          <TableCell>{data.owner.lastName} {data.owner.firstName}</TableCell>
          <TableCell>مالك السيارة</TableCell>
        </TableRow>
       
      </TableBody>
    </Table>
    </>
  );
}
