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
          <TableColumn>info</TableColumn>
          <TableColumn></TableColumn>
          <TableColumn>المعلومات</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Nom</TableCell>
            <TableCell>{data.lastName}</TableCell>
            <TableCell>اللقب</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Prenom</TableCell>
            <TableCell>{data.firstName}</TableCell>
            <TableCell>الاسم</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Date De Naissance</TableCell>
            <TableCell>1/1/1991</TableCell>
            <TableCell>تاريخ الميلاد</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>ٌ address </TableCell>
            <TableCell>{data.address.State_Region}/{data.address.City}/{data.address.neighborhood}</TableCell>
            <TableCell>عنوان السكن </TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>Email</TableCell>
            <TableCell>{data.email}</TableCell>
            <TableCell>ايمايل</TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell>phone</TableCell>
            <TableCell>{data.phone}</TableCell>
            <TableCell>رقم الهاتف</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
