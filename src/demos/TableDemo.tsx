"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  DataTable,
  type Column
} from "../components/rachanaUI/ui/Table";

/* ============================================================================
   DATA TYPES
============================================================================ */
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
};

/* ============================================================================
   SAMPLE DATA
============================================================================ */
const users: User[] = [
  {
    id: "1",
    name: "Ranjit",
    email: "ranjit@mail.com",
    role: "Admin",
    status: "Active"
  },
  {
    id: "2",
    name: "Anita",
    email: "anita@mail.com",
    role: "Editor",
    status: "Active"
  },
  {
    id: "3",
    name: "Rahul",
    email: "rahul@mail.com",
    role: "Viewer",
    status: "Inactive"
  },
  {
    id: "4",
    name: "Neha",
    email: "neha@mail.com",
    role: "Editor",
    status: "Active"
  }
];

/* ============================================================================
   COLUMNS
============================================================================ */
const columns: Column<User>[] = [
  {
    key: "name",
    header: "Name",
    width: 180
  },
  {
    key: "email",
    header: "Email",
    width: 260
  },
  {
    key: "role",
    header: "Role"
  },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <span
        style={{
          fontWeight: 500,
          color: row.status === "Active" ? "green" : "gray"
        }}
      >
        {row.status}
      </span>
    )
  }
];

/* ============================================================================
   DEMO
============================================================================ */
export default function TableDemo() {
  return (
    <div className="p-6 space-y-14">
      <h1 className="text-2xl font-semibold">Table / DataTable Demo</h1>

      {/* ======================================================
          BASIC TABLE (NO DATATABLE)
      ====================================================== */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Basic Table</h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* ======================================================
          DATATABLE – NO SELECTION
      ====================================================== */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">DataTable (no selection)</h2>

        <DataTable<User>
          data={users}
          columns={columns}
          getRowId={(row) => row.id}
        />
      </section>

      {/* ======================================================
          SINGLE SELECTION
      ====================================================== */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Single selection</h2>

        <DataTable<User>
          data={users}
          columns={columns}
          selection="single"
          getRowId={(row) => row.id}
        />
      </section>

      {/* ======================================================
          MULTIPLE SELECTION
      ====================================================== */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Multiple selection</h2>

        <DataTable<User>
          data={users}
          columns={columns}
          selection="multiple"
          getRowId={(row) => row.id}
        />
      </section>

      {/* ======================================================
          FROZEN COLUMNS
      ====================================================== */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Frozen columns</h2>

        <DataTable<User>
          data={users}
          columns={columns}
          frozenColumns={1}
          selection="multiple"
          getRowId={(row) => row.id}
        />
      </section>

      {/* ======================================================
          FROZEN SELECTED ROWS
      ====================================================== */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Frozen selected rows</h2>

        <DataTable<User>
          data={users}
          columns={columns}
          selection="multiple"
          frozenColumns={1}
          freezeSelectedRows
          getRowId={(row) => row.id}
        />
      </section>
    </div>
  );
}
