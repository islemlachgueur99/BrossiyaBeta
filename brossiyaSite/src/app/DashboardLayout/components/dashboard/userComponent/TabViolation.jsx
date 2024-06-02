import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";

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
            <TableCell>Id contravention </TableCell>
            <TableCell>{data.id_of_infraction}</TableCell>
            <TableCell> رقم المخالفة  </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Type Violation</TableCell>
            <TableCell>{data.data_of_infraction.type_infraction}</TableCell>
            <TableCell>نوع المخالفة</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Date De Violation</TableCell>
            <TableCell>{data.data_of_infraction.date_of_violation}</TableCell>
            <TableCell>تاريخ المخالفة</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>heure de la violation</TableCell>
            <TableCell>{data.data_of_infraction.time_of_violation}</TableCell>
            <TableCell>وقت المخالفة</TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>Date Dinscription Système</TableCell>
            <TableCell>{data.Registration_date_system} </TableCell>
            <TableCell> تاريخ  التسجيل في النظام </TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell>Le Lieu Ou la Violation Sest Produite</TableCell>
            <TableCell>{data.data_of_infraction.location_address}</TableCell>
            <TableCell>مكان وقوع المخالفة  </TableCell>
          </TableRow>
         
         
        </TableBody>
      </Table>
    </>
  );
}
